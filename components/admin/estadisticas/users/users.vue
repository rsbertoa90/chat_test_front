<template>
    <div>
        <div v-if="users">

            <table class="table table-striped">
                <tr>
                    <td>
                        <b>Usuarios registrados</b>
                    </td>
                    <td>
                        {{total}}
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>
                            Con registro confirmado
                        </b>
                    </td>
                    <td>
                        {{confirmed}}
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>No confirmaron registro</b>
                    </td>
                    <td>
                        {{notConfirmed}}
                    </td>
                </tr>
            </table>

            <table class="table table-striped mt-4">
                <thead>
                    <th>Nro cliente</th>
                    <th>Nombre</th>
                    <th>Mail</th>
                    <th>Fecha registro</th>
                    <th>Estado registro</th>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{user.id}}</td>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.created_at|date}}</td>
                        <td>{{user.reg_confirmed ? 'confirmado' : 'no confirmado'}}</td>
                    </tr>
                </tbody>
            </table>
        
        </div>


        <span v-if="!users">Cargando datos...</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                users:null
                
            }
        },
        mounted(){
            this.$axios.get('/all-users')
                .then(r=>{
                    this.users=r.data;
                })
        },
        computed:
        {
            total()
            {
                return this.users.length
            },
            confirmed(){
                let arr = this.users.filter(u=>{
                    return u.reg_confirmed
                })
                return arr.length;
            },
            notConfirmed(){
                let arr = this.users.filter(u=>{
                    return !u.reg_confirmed
                })
                return arr.length;
            }
        }
    }
</script>