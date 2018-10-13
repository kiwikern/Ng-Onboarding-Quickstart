import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { addPackageToPackageJson, getPackageVersionFromPackageJson } from './package-config';
import { Schema } from './schema';
import { onboquiVersion } from './version-names';

export default function (options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const ngCoreVersionTag = getPackageVersionFromPackageJson(host, '@angular/core');

    addPackageToPackageJson(host, 'ng-onboarding-quickstart', `^${onboquiVersion}`);
    addPackageToPackageJson(host, '@angular/cdk', ngCoreVersionTag);

    const installTaskId = context.addTask(new NodePackageInstallTask());

    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
  };
}
