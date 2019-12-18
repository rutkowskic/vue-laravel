<template>
    <section>
        <b-container>
            <b-row>
                <b-col sm="8" offset-md="2">
                    <b-card class="mt-3" header="Register">
                        <b-form @submit="registerUser">
                            <b-form-group label="Email:" label-for="email">
                                <b-form-input id="email" type="email" placeholder="Enter email" required v-model="email"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Password:" label-for="password">
                                <b-form-input id="password" type="password" placeholder="Enter password" required v-model="password"></b-form-input>
                            </b-form-group>
                            <b-button type="submit" variant="primary">Register</b-button>
                        </b-form>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
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
            registerUser(e){
                e.preventDefault()
                const { email, password } = this;
                this.$store.dispatch('registerUser', { email, password }).then(() => {
                    this.$router.push({ name: 'home'})
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }
</script>
