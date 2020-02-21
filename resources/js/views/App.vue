<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <a class="navbar-brand" :to="{ name: 'home' }">{{ $t("main.calendar") }}</a>
            <button class="navbar-toggler" data-target="#my-nav" data-toggle="collapse" aria-controls="my-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="my-nav" class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <dropdown v-if="!isLoging">
                        <template v-slot:header>
                            {{ $t("auth.auth") }}
                        </template>
                        <template v-slot:body>
                            <router-link class="dropdown-item" :to="{ name: 'login'}">{{ $t("auth.login") }}</router-link>
                            <router-link class="dropdown-item" :to="{ name: 'register'}">{{ $t("auth.register") }}</router-link>
                        </template>
                    </dropdown>
                    <dropdown v-if="isLoging">
                        <template v-slot:header>
                            {{ $t("auth.user") }}
                        </template>
                        <template v-slot:body>
                            <router-link class="dropdown-item" :to="{ name: 'user'}">{{ $t("auth.user") }}</router-link>
                            <a class="dropdown-item" @click="logout()">{{ $t("auth.logout") }}</a>
                        </template>
                    </dropdown>
                    <dropdown>
                        <template v-slot:header>
                            {{ $t("auth.lang") }}
                        </template>
                        <template v-slot:body>
                            <a class="dropdown-item" v-for="(lang, i) in langs" :key="i" @click="changeLangs(lang)">{{ lang | uppercase }}</a>
                        </template>
                    </dropdown>
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
    import Dropdown from '../components/Dropdown'
    export default {
        components: {
            'dropdown': Dropdown
        },
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
                this.$i18n.locale = lang
            }
        },
        destroyed(){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
        created(){
            console.log(this)
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