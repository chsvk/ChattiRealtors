<template>
    <div class="noplot">
            <p>No Plots Added</p>
            <button @click="addNew">Add New Plot</button>
        </div>
</template>

<script>
export default {
    methods: {
        addNew: function(){
        router.push('/dashboard/new');
    }
    }
}
</script>
<style lang="scss" scoped>

 .noplot{
        position: absolute;
        left: 30%;
        top: 50%;
        transform: translateX(-50%);
        transform: translateY(-50%);

        p{
            font-style: italic;
        }
        button{
            width: 500px;
            background: #AD974f;
            border: none;
            border-radius: 8px;
            padding: 1em;
            margin: 1em;
            color: white;
            text-transform: uppercase;
            cursor: pointer;
        }
    }
</style>
