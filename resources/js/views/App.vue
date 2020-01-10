<template>
    <nav>
        <b-navbar toggleable="lg" type="light" >
            <b-navbar-brand href="#">{{ $t("main.calendar") }}</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown text="Auth" right v-if="!isLoging">
                        <b-dropdown-item :to="{ name: 'login' }">{{ $t("auth.login") }}</b-dropdown-item>
                        <b-dropdown-item :to="{ name: 'register' }">{{ $t("auth.register") }}</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="User" right v-if="isLoging">
                        <b-dropdown-item :to="{ name: 'user' }">{{ $t("auth.user") }}</b-dropdown-item>
                        <b-dropdown-item :to="{ name: 'admin' }">{{ $t("auth.admin") }}</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item href="#" @click="logout()">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#" v-for="(lang, i) in langs" :key="i" @click="changeLangs(lang)">{{ lang | uppercase }}</b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
        <main class="py-4">
            <transition name="fade" mode="out-in">
                <router-view :key="this.$route.path"></router-view>
            </transition>
        </main>
    </nav>
</template>
<script>
    export default {
        data: function () {
            return {
                langs: ['en', 'pl']
            }
        },
        computed: {
            isLoging() {
                const { user, token } = this.$store.getters;
                return !user.length > 0 && token !== '';
            },
            isAdmin() {
                const { user } = this.$store.getters;
                if(user.admin === 1){
                    return true;
                }
                return false;
            }
        },
        methods: {
            logout(){
                this.$store.dispatch('logoutUser');
                this.$router.push({ name: 'home'})
            },
            changeLangs(lang){
                console.log(lang)
                this.$i18n.locale = lang
            }
        }
    }
</script>

<style>
    .router-link-active {}

    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 0.5s ease;
    }

    .fade-leave {}

    .fade-leave-active {
        transition: opacity 0.5s ease;
        opacity: 0;
    }
</style>