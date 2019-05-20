export default function (ctx) {
   let user = null;
   if(ctx.app.$auth){
     user = ctx.app.$auth.user;
   }
    if (!user || user.role_id>2)
    {
        return ctx.redirect('/login')
    }
}
