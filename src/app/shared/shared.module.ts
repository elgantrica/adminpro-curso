import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NpagefoundComponent } from './npagefound/npagefound.component';

@NgModule({
    declarations: [
        NpagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ],
    imports: [],
    exports: [
        NpagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ],
    providers: [],
})
export class SharedModule {}