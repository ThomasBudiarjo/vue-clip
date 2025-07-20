<template>
  <div class="animate-fade-in">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-16">
      <LoadingSpinner text="Retrieving your clip..." center />
    </div>

    <!-- Content Display -->
    <div v-else-if="clipContent !== null" class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8 animate-slide-up">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Clip Retrieved</h1>
        <p class="text-gray-600">This content has been permanently deleted from our servers</p>
      </div>

      <!-- Content Container -->
      <div class="glass rounded-2xl p-8 shadow-2xl animate-slide-up" style="animation-delay: 0.1s">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-gray-800">Content</h2>
          <button
            @click="copyToClipboard"
            :class="[
              'btn-secondary text-sm py-2 px-4 flex items-center space-x-2 transition-all duration-200',
              copied ? 'bg-green-100 border-green-300 text-green-700' : ''
            ]"
          >
            <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
          </button>
        </div>

        <!-- Content Display -->
        <div class="relative">
          <pre class="bg-gray-50 border border-gray-200 rounded-lg p-6 overflow-auto max-h-96 text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">{{ clipContent }}</pre>
          
          <!-- Content Stats -->
          <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
            <span>{{ clipContent.length }} characters</span>
            <span>{{ lineCount }} lines</span>
          </div>
        </div>
      </div>

      <!-- Warning Notice -->
      <div class="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl animate-slide-up" style="animation-delay: 0.2s">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-amber-800 mb-1">Important Notice</h3>
            <p class="text-amber-700">
              This content has been permanently deleted and cannot be accessed again. 
              Make sure to copy anything you need before leaving this page.
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 mt-8 animate-slide-up" style="animation-delay: 0.3s">
        <router-link 
          to="/" 
          class="btn-primary text-center"
        >
          <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Create New Clip
        </router-link>
        
        <button
          @click="shareClip"
          v-if="canShare"
          class="btn-secondary text-center"
        >
          <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
          </svg>
          Share Content
        </button>
      </div>
    </div>

    <!-- Error State (this shouldn't render as router handles redirect) -->
    <div v-else class="text-center py-16">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Clip Not Found</h1>
      <p class="text-gray-600 mb-6">This clip may have already been read or doesn't exist.</p>
      <router-link to="/" class="btn-primary inline-flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Create New Clip
      </router-link>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default {
  name: 'ReadView',
  components: {
    LoadingSpinner
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup() {
    const pb = inject('pb')
    return { pb }
  },
  data() {
    return {
      clipContent: null,
      loading: true,
      copied: false,
      canShare: 'share' in navigator
    }
  },
  computed: {
    lineCount() {
      if (!this.clipContent) return 0
      return this.clipContent.split('\n').length
    }
  },
  async created() {
    await this.fetchAndDeleteClip()
  },
  methods: {
    async fetchAndDeleteClip() {
      try {
        this.loading = true
        
        // Fetch the clip record
        const record = await this.pb.collection('clips').getFirstListItem(`slug="${this.slug}"`)
        
        // Store the content
        this.clipContent = record.content
        
        // CRITICAL: Immediately delete the record (one-time read)
        await this.pb.collection('clips').delete(record.id)
        
      } catch (error) {
        console.error('Error fetching clip:', error)
        
        // Redirect to create page with the slug pre-filled
        this.$router.push({
          name: 'create',
          query: { slug: this.slug }
        })
      } finally {
        this.loading = false
      }
    },
    
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.clipContent)
        this.copied = true
        
        // Reset copied state after 2 seconds
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        
        // Fallback for older browsers
        this.fallbackCopyToClipboard(this.clipContent)
      }
    },
    
    fallbackCopyToClipboard(text) {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (error) {
        console.error('Fallback copy failed:', error)
      }
      
      document.body.removeChild(textArea)
    },
    
    async shareClip() {
      if (!this.canShare) return
      
      try {
        await navigator.share({
          title: 'Shared Text from VueClip',
          text: this.clipContent,
          url: window.location.href
        })
      } catch (error) {
        // User cancelled or sharing failed
        console.log('Share cancelled or failed:', error)
      }
    }
  }
}
</script>