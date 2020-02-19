<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="auth" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="isHidden = !isHidden" ref="authDropButton">
            <slot name="header"></slot>
        </a>
        <div class="dropdown-menu" aria-labelledby="auth" :class="{ show: isHidden }">
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

                document.onmousedown = (e) => {
                    const target = e.target;
                    const dropdown = target.closest('.dropdown-toggle') || target.closest('.dropdown-menu');

                    if (!dropdown) {
                        $root.$emit('dropdown:hide');
                    }
                }
            }
        },
}
</script>