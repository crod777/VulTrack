
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NbSecurityModule } from '@nebular/security';
import { accessControlList } from '../access-control-list';


export const NB_CORE_PROVIDERS = [
  NbSecurityModule.forRoot(accessControlList).providers,
];
function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
