<template>
    <section>
        <div class="row">
            <div class="col-sm-8 offset-md-2">
                <div class="card">
                    <div class="card-header">
                        {{ $t("auth.login") }}
                    </div>
                    <div class="card-body">
                        <form @submit="loginUser">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelpId" placeholder="Email" v-model="email">
                            </div>
                            <div class="form-group">
                                <label for="password">{{ $t('auth.password') }}</label>
                                <input type="password" class="form-control" name="password" id="password" placeholder="Password" v-model="password">
                            </div>
                            <button type="submit" class="btn btn-primary">{{ $t('auth.login') }}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data: function(){
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            loginUser(e){
                e.preventDefault()
                const { email, password } = this;
                this.$store.dispatch('loginUser', { email, password }).then(() => {
                    this.$router.push({ name: 'home'})
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }
</script>
