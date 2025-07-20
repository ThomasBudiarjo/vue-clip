<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold text-gray-800 mb-4 animate-slide-up">
        Share Text
        <span class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Securely
        </span>
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.1s">
        Create a one-time link to share text that self-destructs after being read once
      </p>
    </div>

    <!-- Create Form -->
    <div class="max-w-2xl mx-auto">
      <div class="glass rounded-2xl p-8 shadow-2xl animate-slide-up" style="animation-delay: 0.2s">
        <form @submit.prevent="createClip" class="space-y-6">
          <!-- URL Slug Field -->
          <div>
            <label for="slug" class="block text-sm font-medium text-gray-700 mb-2">
              Custom URL (optional)
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">
                  {{ baseUrl }}/
                </span>
              </div>
              <input
                id="slug"
                v-model="slug"
                type="text"
                placeholder="my-secret-text"
                class="input-field pl-32"
                :class="{
                  'border-red-400 focus:border-red-400 focus:ring-red-400/20': errors.slug,
                  'border-green-400 focus:border-green-400 focus:ring-green-400/20': slug && !errors.slug
                }"
                @input="validateSlug"
                maxlength="50"
              />
            </div>
            <p v-if="errors.slug" class="mt-2 text-sm text-red-600">{{ errors.slug }}</p>
            <p v-else class="mt-2 text-sm text-gray-500">
              Leave empty for a random URL. Only letters, numbers, and hyphens allowed.
            </p>
          </div>

          <!-- Content Field -->
          <div>
            <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
              Text Content
            </label>
            <textarea
              id="content"
              v-model="content"
              rows="8"
              placeholder="Paste your text here..."
              class="input-field resize-none"
              :class="{
                'border-red-400 focus:border-red-400 focus:ring-red-400/20': errors.content,
                'border-green-400 focus:border-green-400 focus:ring-green-400/20': content && !errors.content
              }"
              @input="validateContent"
              maxlength="10000"
            ></textarea>
            <div class="flex justify-between mt-2">
              <p v-if="errors.content" class="text-sm text-red-600">{{ errors.content }}</p>
              <p v-else class="text-sm text-gray-500">Required</p>
              <p class="text-sm text-gray-500">{{ content.length }}/10,000</p>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="loading || !isFormValid"
              class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <LoadingSpinner v-if="loading" text="Creating clip..." />
              <span v-else class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Create Secure Link
              </span>
            </button>
          </div>

          <!-- Error Display -->
          <div v-if="errors.general" class="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-700">{{ errors.general }}</p>
          </div>
        </form>
      </div>

      <!-- Features Section -->
      <div class="grid md:grid-cols-3 gap-6 mt-12 animate-slide-up" style="animation-delay: 0.3s">
        <div class="text-center p-6 glass rounded-xl">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 mb-2">One-Time Read</h3>
          <p class="text-sm text-gray-600">Content is automatically deleted after the first view</p>
        </div>

        <div class="text-center p-6 glass rounded-xl">
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 mb-2">No Registration</h3>
          <p class="text-sm text-gray-600">Create and share instantly without any sign-up</p>
        </div>

        <div class="text-center p-6 glass rounded-xl">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 mb-2">Custom URLs</h3>
          <p class="text-sm text-gray-600">Choose your own memorable link or get a random one</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default {
  name: 'CreateView',
  components: {
    LoadingSpinner
  },
  setup() {
    const pb = inject('pb')
    return { pb }
  },
  data() {
    return {
      slug: '',
      content: '',
      loading: false,
      errors: {
        slug: '',
        content: '',
        general: ''
      }
    }
  },
  computed: {
    baseUrl() {
      return window.location.origin
    },
    isFormValid() {
      return this.content.trim() && 
             !this.errors.slug && 
             !this.errors.content && 
             !this.loading
    }
  },
  mounted() {
    // Pre-fill slug from query params if coming from not-found page
    if (this.$route.query.slug) {
      this.slug = this.$route.query.slug
      this.validateSlug()
    }
  },
  methods: {
    validateSlug() {
      this.errors.slug = ''
      
      if (this.slug.trim()) {
        // Check for valid characters (letters, numbers, hyphens)
        const slugPattern = /^[a-zA-Z0-9-]+$/
        if (!slugPattern.test(this.slug)) {
          this.errors.slug = 'Only letters, numbers, and hyphens are allowed'
          return
        }
        
        // Check length
        if (this.slug.length < 3) {
          this.errors.slug = 'URL must be at least 3 characters long'
          return
        }
        
        // Check for consecutive hyphens
        if (this.slug.includes('--')) {
          this.errors.slug = 'Consecutive hyphens are not allowed'
          return
        }
        
        // Check start/end with hyphens
        if (this.slug.startsWith('-') || this.slug.endsWith('-')) {
          this.errors.slug = 'URL cannot start or end with a hyphen'
          return
        }
      }
    },
    
    validateContent() {
      this.errors.content = ''
      
      if (!this.content.trim()) {
        this.errors.content = 'Content is required'
        return
      }
      
      if (this.content.length > 10000) {
        this.errors.content = 'Content cannot exceed 10,000 characters'
        return
      }
    },
    
    generateRandomSlug() {
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return result
    },
    
    async createClip() {
      // Clear previous errors
      this.errors.general = ''
      
      // Validate form
      this.validateSlug()
      this.validateContent()
      
      if (!this.isFormValid) {
        return
      }
      
      this.loading = true
      
      try {
        // Use provided slug or generate random one
        const finalSlug = this.slug.trim() || this.generateRandomSlug()
        
        // Create the clip
        await this.pb.collection('clips').create({
          slug: finalSlug,
          content: this.content.trim()
        })
        
        // Navigate to success page
        this.$router.push({
          name: 'success',
          query: { newSlug: finalSlug }
        })
        
      } catch (error) {
        console.error('Error creating clip:', error)
        
        if (error.status === 400 && error.data?.data?.slug) {
          this.errors.slug = 'This URL is already taken. Please choose another one.'
        } else {
          this.errors.general = 'Failed to create clip. Please try again.'
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>