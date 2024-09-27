
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';




export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [logedGuard],
        children: [
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full',
          },
          {
            path: 'login',
            loadComponent: () =>
              import('./Components/login/login.component').then(
                (m) => m.LoginComponent
              ),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('./Components/register/register.component').then(
                (m) => m.RegisterComponent
              ),
          },
          {
            path: 'forgot',
            loadComponent: () =>
              import('./Components/forgotpassword/forgotpassword.component').then(
                (m) => m.ForgotpasswordComponent
              ),
          },
        ],
      },
      {
        path: '',
        component: BlankLayoutComponent,
        canActivate: [authGuard],
        children: [
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full',
          },
          {
            path: 'home',
            loadComponent: () =>
              import('./Components/home/home.component').then((m) => m.HomeComponent),
          },
          {
            path: 'product',
            loadComponent: () =>
              import('./Components/product/product.component').then((m) => m.ProductComponent),
          },
          {
            path: 'cart',
            loadComponent: () =>
              import('./Components/cart/cart.component').then((m) => m.CartComponent),
          },
          {
            path: 'brands',
            loadComponent: () =>
              import('./Components/brands/brands.component').then((m) => m.BrandsComponent),
          },
          {
            path: 'categories',
            loadComponent: () =>
              import('./Components/categories/categories.component').then(
                (m) => m.CategoriesComponent
              ),
          },
          {
            path: 'infoCategory/:id',
            loadComponent: () =>
              import('./Components/info-category/infocategory/infocategory.component').then(
                (m) => m.InfocategoryComponent
              ),
          },
          {path:'infoBrand/:id',loadComponent:()=>import('./Components/infoBrand/info-brand/info-brand.component').then((e)=>e.InfoBrandComponent)},
        //   {path:'wishlist/:id',loadComponent:()=>import('./Components/wishlist/wishlist/wishlist.component').then((e)=>e.WishlistComponent)},

          {
            path: 'details/:id',
            loadComponent: () =>
              import('./Components/details/details.component').then(
                (m) => m.DetailsComponent
              ),
          },
          {
            path: 'allorders',
            loadComponent: () =>
              import('./Components/allorders/allorders.component').then(
                (m) => m.AllordersComponent
              ),
          },
          {
            path: 'orders/:id',
            loadComponent: () =>
              import('./Components/orders/orders.component').then((m) => m.OrdersComponent),
          },
        ],
      },
      {
        path: '**',
        loadComponent: () =>
          import('./Components/notfound/notfound.component').then(
            (m) => m.NotfoundComponent
          ),
      },
];
 
















