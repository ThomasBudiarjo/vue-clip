<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div class="relative">
      <!-- Outer ring -->
      <div class="w-12 h-12 rounded-full border-4 border-gray-200"></div>
      <!-- Spinning part -->
      <div class="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>
    </div>
    <span v-if="text" class="ml-3 text-gray-600 font-medium">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    text: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    containerClass() {
      const classes = []
      
      if (this.center) {
        classes.push('min-h-32')
      }
      
      return classes.join(' ')
    }
  }
}
</script>