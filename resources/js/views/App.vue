<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <a class="navbar-brand" :to="{ name: 'home' }">{{ $t("main.calendar") }}</a>
            <button class="navbar-toggler" data-target="#my-nav" data-toggle="collapse" aria-controls="my-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="my-nav" class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item dropdown" v-if="!isLoging">
                        <a class="nav-link dropdown-toggle" href="#" id="auth" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="showAuth = !showAuth" ref="authDropButton">
                        Auth
                        </a>
                        <div class="dropdown-menu" aria-labelledby="auth" :class="{ show: showAuth }" v-closable="{exclude: ['authDropButton'], handler: 'onClose', dataModel: 'showAuth'}">
                            <router-link class="dropdown-item" :to="{ name: 'login'}">{{ $t("auth.login") }}</router-link>
                            <router-link class="dropdown-item" :to="{ name: 'register'}">{{ $t("auth.register") }}</router-link>
                        </div>
                    </li>

                    <li class="nav-item dropdown" v-if="isLoging">
                        <a class="nav-link dropdown-toggle" href="#" id="user" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="showUser = !showUser" ref="userDropButton">
                        User
                        </a>
                        <div class="dropdown-menu" aria-labelledby="user" :class="{ show: showUser }" v-closable="{exclude: ['userDropButton'], handler: 'onClose', dataModel: 'showUser'}">
                            <router-link class="dropdown-item" :to="{ name: 'user'}">{{ $t("auth.user") }}</router-link>
                            <a class="dropdown-item" @click="logout()">{{ $t("auth.logout") }}</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="lang" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="showLang = !showLang" ref="langDropButton">
                        Lang
                        </a>
                        <div class="dropdown-menu" aria-labelledby="lang" :class="{ show: showLang }" v-closable="{exclude: ['langDropButton'], handler: 'onClose', dataModel: 'showLang'}">
                            <a class="dropdown-item" v-for="(lang, i) in langs" :key="i" @click="changeLangs(lang)">{{ lang | uppercase }}</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        <main style="margin-top: 75px;">
            <div class="container">    
                <transition name="fade" mode="out-in">
                    <router-view :key="this.$route.path"></router-view>
                </transition>
            </div>
        </main>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                langs: ['en', 'pl'],
                showAuth: false,
                showUser: false,
                showLang: false,
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
                this.$i18n.locale = lang
            },
            onClose(dataModel){
                this[dataModel] = false
            }
        },
        destroyed(){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
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