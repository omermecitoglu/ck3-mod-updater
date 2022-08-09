import path from "path";
import { access } from "fs/promises";
import { Clone, Repository } from "nodegit";

const mods_folder = "C:/Users/Omer/Documents/Paradox Interactive/Crusader Kings III/test";

function dateFormat(date: Date) {
  return date.toLocaleString("tr-TR", {
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

  constructor(id: string, name: string, git: string) {
    this.id = id;
    this.name = name;
    this.git = git;
  }

  async init() {
    const repoPath = path.join(mods_folder, this.id);
    try {
      await access(repoPath);
      this.repo = await Repository.open(repoPath);
    } catch {
      this.repo = await Clone.clone(this.git, repoPath);
    }
  }

  check() {
    if (!this.repo) {
      throw new Error("ERROR:220C76CF12844419BEA5A28B832D75FC");
    }
    return this.repo.fetch("origin");
  }

  async update() {
    if (!this.repo) {
      throw new Error("ERROR:9DD39CDE75FE4BA388E7B4611310D686");
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
      date: dateFormat(commit.date()),
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
      date: dateFormat(commit.date()),
    };
  }

  async toJSON() {
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
