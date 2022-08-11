import path from "path";
import settings from "electron-settings";
import { access, copyFile } from "fs/promises";
import { Clone, Repository } from "nodegit";
import { getLocaleCode } from "./locale";
import { ModTemplate } from "~/components/ModList";

function dateFormat(date: Date, language: string) {
  return date.toLocaleString(getLocaleCode(language), {
    dateStyle: "long",
    timeStyle: "short",
  });
}

type Version = {
  id: string,
  date: string,
}

export default class Mod {
  id: string;
  name: string;
  git: string;
  repo?: Repository;
  path?: string;

  constructor(id: string, name: string, git: string) {
    this.id = id;
    this.name = name;
    this.git = git;
  }

  async init() {
    const modsPath = await settings.get("modsPath") as string;
    const repoPath = path.join(modsPath, this.id);
    try {
      await access(repoPath);
      this.repo = await Repository.open(repoPath);
      this.path = repoPath;
    } catch {
      delete this.repo;
      delete this.path;
    }
  }

  async download() {
    const modsPath = await settings.get("modsPath") as string;
    const repoPath = path.join(modsPath, this.id);
    try {
      this.repo = await Clone.clone(this.git, repoPath);
      this.path = repoPath;
      await this.install();
    } catch (err) {
      // do nothing
    }
  }

  async install() {
    try {
      const modsPath = await settings.get("modsPath") as string;
      const repoPath = path.join(modsPath, this.id);
      const source = path.join(repoPath, "descriptor.mod");
      const target = path.join(modsPath, this.id + ".mod");
      await copyFile(source, target);
    } catch {
      // do nothing
    }
  }

  async check() {
    if (this.repo) {
      this.repo.fetch("origin");
    }
  }

  async update() {
    if (!this.repo) {
      throw new Error("ERROR:E5C8885EA1D043FBA366B138DBADBD28");
    }
    const current = await this.repo.getCurrentBranch();
    await this.repo.mergeBranches(current, "origin/" + current.shorthand());
  }

  async mainBranchName(): Promise<string> {
    if (!this.repo) {
      throw new Error("ERROR:9DD39CDE75FE4BA388E7B4611310D686");
    }
    const ref = await this.repo.getCurrentBranch();
    return ref.shorthand();
  }

  async getCurrentVersion(): Promise<Version> {
    if (!this.repo) {
      throw new Error("ERROR:F4A9635BCB334FCF931EE32857F83BDF");
    }
    const commit = await this.repo.getHeadCommit();
    return {
      id: commit.id().tostrS(),
      date: dateFormat(commit.date(), await settings.get("language") as string),
    };
  }

  async getLatestVersion(): Promise<Version> {
    if (!this.repo) {
      throw new Error("ERROR:2556FEB8E0DA4704AE96FD6C94883173");
    }
    const branchName = await this.mainBranchName();
    const commit = await this.repo.getReferenceCommit("origin/" + branchName);
    return {
      id: commit.id().tostrS(),
      date: dateFormat(commit.date(), await settings.get("language") as string),
    };
  }

  async toJSON(): Promise<ModTemplate> {
    if (!this.repo) {
      return {
        id:  this.id,
        name: this.name,
        version: "",
        state: "not_installed",
        updateVersion: "",
      };
    }
    const current = await this.getCurrentVersion();
    const latest = await this.getLatestVersion();
    return {
      id:  this.id,
      name: this.name,
      version: current.date,
      state: current.id === latest.id ? "updated" : "needs_update",
      updateVersion: latest.date,
    };
  }
}
