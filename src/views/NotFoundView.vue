<template>
  <div class="animate-fade-in">
    <!-- Not Found Header -->
    <div class="text-center mb-12 animate-slide-up">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-6">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-gray-800 mb-3">
        Clip Not Found
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        This clip may have already been read or doesn't exist. 
        <span v-if="attemptedSlug">Would you like to create a new clip with the URL "{{ attemptedSlug }}"?</span>
      </p>
    </div>

    <!-- Main Content -->
    <div class="max-w-2xl mx-auto">
      <!-- Smart Suggestion Card -->
      <div v-if="attemptedSlug" class="glass rounded-2xl p-8 shadow-2xl mb-8 animate-slide-up" style="animation-delay: 0.1s">
        <div class="text-center">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Create This Clip Instead?</h2>
          <p class="text-gray-600 mb-6">
            Since "<span class="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{{ attemptedSlug }}</span>" doesn't exist, 
            you can create a new clip with this URL right now.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="createWithSlug"
              class="btn-primary flex-1"
            >
              <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Create "{{ attemptedSlug }}"
            </button>
            
            <button
              @click="goHome"
              class="btn-secondary flex-1"
            >
              <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Start Fresh
            </button>
          </div>
        </div>
      </div>

      <!-- Alternative if no slug attempted -->
      <div v-else class="glass rounded-2xl p-8 shadow-2xl mb-8 animate-slide-up" style="animation-delay: 0.1s">
        <div class="text-center">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">What would you like to do?</h2>
          <p class="text-gray-600 mb-6">
            The page you're looking for doesn't exist. You can create a new clip or go back to the homepage.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <router-link 
              to="/" 
              class="btn-primary flex-1 text-center"
            >
              <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Create New Clip
            </router-link>
            
            <button
              @click="goBack"
              class="btn-secondary flex-1"
            >
              <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Go Back
            </button>
          </div>
        </div>
      </div>

      <!-- Helpful Information -->
      <div class="grid md:grid-cols-2 gap-6 animate-slide-up" style="animation-delay: 0.2s">
        <div class="p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-blue-800 mb-1">One-Time Links</h3>
              <p class="text-blue-700 text-sm">
                Clips are automatically deleted after being viewed once for maximum security.
              </p>
            </div>
          </div>
        </div>

        <div class="p-6 bg-purple-50 border border-purple-200 rounded-xl">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-purple-800 mb-1">Secure Sharing</h3>
              <p class="text-purple-700 text-sm">
                Create custom URLs or let us generate random ones for secure text sharing.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Auto-redirect notice -->
      <div v-if="attemptedSlug && redirecting" class="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center animate-slide-up" style="animation-delay: 0.3s">
        <div class="flex items-center justify-center space-x-2">
          <LoadingSpinner />
          <span class="text-yellow-800">Redirecting to create page in {{ countdown }} seconds...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default {
  name: 'NotFoundView',
  components: {
    LoadingSpinner
  },
  data() {
    return {
      redirecting: false,
      countdown: 5,
      countdownInterval: null
    }
  },
  computed: {
    attemptedSlug() {
      // Extract slug from the current path
      const path = this.$route.path
      if (path === '/' || path === '/success' || path === '/not-found') {
        return null
      }
      return path.substring(1) // Remove leading slash
    }
  },
  mounted() {
    // If there's an attempted slug, start auto-redirect countdown
    if (this.attemptedSlug) {
      this.startAutoRedirect()
    }
  },
  beforeUnmount() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval)
    }
  },
  methods: {
    createWithSlug() {
      this.$router.push({
        name: 'create',
        query: { slug: this.attemptedSlug }
      })
    },
    
    goHome() {
      this.$router.push('/')
    },
    
    goBack() {
      // Go back in history, or home if no history
      if (window.history.length > 1) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    },
    
    startAutoRedirect() {
      this.redirecting = true
      
      this.countdownInterval = setInterval(() => {
        this.countdown--
        
        if (this.countdown <= 0) {
          this.createWithSlug()
        }
      }, 1000)
    }
  }
}
</script>