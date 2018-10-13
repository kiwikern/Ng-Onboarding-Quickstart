import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { Schema } from './schema';
import { getProjectMainFile } from '../utils/project-main-file';
import { getProjectStyleFile } from '../utils/project-style-file';
import { getProjectFromWorkspace } from '../utils/get-projects';
import { addModuleImportToRootModule } from '../utils/ast';
import { hasNgModuleImport } from '../utils/ng-module-imports';

const cdkModuleName = 'CdkModule';

/**
 *  - Add Packages to package.json
 *  - Adds pre-built themes to styles.ext
 *  - Adds import to app.module
 */
export default function (options: Schema): Rule {
  return chain([
    addCdkModule(options),
    addOnboardingStyles(options),
  ]);
}

function addCdkModule(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    if (!hasNgModuleImport(host, appModulePath, cdkModuleName)) {
      addModuleImportToRootModule(host, cdkModuleName, '@angular/cdk', project);
    }

    return host;
  };
}

function addOnboardingStyles(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const styleFilePath = getProjectStyleFile(project);
    const buffer = host.read(styleFilePath!);

    if (!styleFilePath || !buffer) {
      return console.warn(`Could not find styles file: "${styleFilePath}". Skipping styles ` +
        `generation. Please consider manually adding the "Roboto" font and resetting the ` +
        `body margin.`);
    }

    const htmlContent = buffer.toString();
    const insertion = `
.elevate#onboarding-active {
  z-index: 10000;
}

.elevate {
  background: white;
  position: relative;
}

.onboqui-backdrop {
  background: rgba(0, 0, 0, 0.6);
}`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(styleFilePath);

    recorder.insertLeft(htmlContent.length, insertion);
    host.commitUpdate(recorder);
  };
}
