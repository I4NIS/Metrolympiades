<script setup>
defineProps({
  buttonText : {
    type : String,
    default: ''
  }
})
</script>

<template>
  <button
      type="submit"
      class="bg-green-100 px-4 py-2 rounded-md"
  >
    {{ buttonText }}
  </button>
</template>


