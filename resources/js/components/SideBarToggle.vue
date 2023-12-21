<template>
    <div class="btn btn-light mr-4">
        <b-button v-b-toggle.sidebar-backdrop>
            <div style="width: 25px;height: 2px;background-color: black;margin: 6px 0;"></div>
            <div style="width: 25px;height: 2px;background-color: black;margin: 6px 0;"></div>
            <div style="width: 25px;height: 2px;background-color: black;margin: 6px 0;"></div>
        </b-button>

        <b-sidebar
                id="sidebar-backdrop"
                title="Menu"
                :backdrop-variant="variant"
                backdrop
        >
            <tree-menu></tree-menu>
        </b-sidebar>
    </div>
</template>

<script>
    import TreeMenu from "./TreeMenu";

    export default {
        components: {
            TreeMenu
        },
        data() {
            return {
                variant: 'dark',
                variants: [
                    'transparent',
                    'white',
                    'light',
                    'dark',
                    'primary',
                    'secondary',
                    'success',
                    'danger',
                    'warning',
                    'info',
                ]
            }
        }
    }
</script>