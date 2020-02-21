<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="toggle" >
            <slot name="header"></slot>
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdown" :class="{ show: isHidden }">
            <slot name="body"></slot>
        </div>
    </li>
</template>

<script>
export default {
    data() {
        return {
            isHidden: false,
        }
    },
    created() {
        const $root = this.$root;

        $root.$on('dropdown:open', () => this.isHidden = true);
        $root.$on('dropdown:hide', () => this.isHidden = false);

        // --- hide dropdown on document click event
        if (!$root['is-dropdown']) {
            Object.defineProperty($root, 'is-dropdown', {
                enumerable: false,
                configurable: false,
                writable: false,
                value: true
            });

            document.onclick = (e) => {
                const target = e.target;
                const dropdown = target.closest('.dropdown-toggle');

                if (!dropdown) {
                    $root.$emit('dropdown:hide');
                }
            }
        }
    },
    methods: {
        toggle(){
            this.$root.$emit('dropdown:hide');
            this.isHidden = !this.isHidden
        }
    },
}
</script>