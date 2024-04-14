<script setup>
defineProps({
    modelValue : {
        type: String,
        default: ''
    }
})
</script>

<template>
    <input 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value )" 
        v-bind="$attrs" 
        class="p-2 text-gray-700 focus:outline-none bg-gray-100 rounded-md"
    >
</template>