<template>
  <div class="animate-fade-in">
    <!-- Success Header -->
    <div class="text-center mb-12 animate-slide-up">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-6 animate-bounce-gentle">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-gray-800 mb-3">
        Clip Created Successfully!
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Your secure link is ready to share. Remember, it can only be viewed once.
      </p>
    </div>

    <!-- URL Display Card -->
    <div class="max-w-3xl mx-auto">
      <div class="glass rounded-2xl p-8 shadow-2xl animate-slide-up" style="animation-delay: 0.1s">
        <div class="text-center">
          <h2 class="text-lg font-semibold text-gray-800 mb-6">Your Shareable Link</h2>
          
          <!-- URL Display -->
          <div class="relative mb-6">
            <div class="flex items-center bg-gray-50 border-2 border-gray-200 rounded-lg p-4 text-left">
              <input
                ref="urlInput"
                :value="shareableUrl"
                readonly
                class="flex-1 bg-transparent text-gray-800 font-mono text-sm focus:outline-none"
              />
              <button
                @click="copyUrl"
                :class="[
                  'ml-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2',
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
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
          </div>

          <!-- Share Options -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <button
              @click="shareViaEmail"
              class="btn-secondary text-sm py-3 px-4 flex flex-col items-center space-y-1"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>Email</span>
            </button>

            <button
              v-if="canShare"
              @click="shareViaWebShare"
              class="btn-secondary text-sm py-3 px-4 flex flex-col items-center space-y-1"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
              </svg>
              <span>Share</span>
            </button>

            <button
              @click="shareViaTwitter"
              class="btn-secondary text-sm py-3 px-4 flex flex-col items-center space-y-1"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
              </svg>
              <span>Twitter</span>
            </button>

            <button
              @click="generateQrCode"
              class="btn-secondary text-sm py-3 px-4 flex flex-col items-center space-y-1"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
              </svg>
              <span>QR Code</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Important Notice -->
      <div class="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl animate-slide-up" style="animation-delay: 0.2s">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-amber-800 mb-1">One-Time Access Only</h3>
            <p class="text-amber-700">
              This link can only be used once. After someone visits it and views the content, 
              the clip will be permanently deleted from our servers.
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 mt-8 animate-slide-up" style="animation-delay: 0.3s">
        <router-link 
          to="/" 
          class="btn-primary text-center flex-1"
        >
          <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Create Another Clip
        </router-link>
        
        <button
          @click="visitClip"
          class="btn-secondary text-center flex-1"
        >
          <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          View Clip (Will Delete)
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuccessView',
  data() {
    return {
      copied: false,
      canShare: 'share' in navigator
    }
  },
  computed: {
    newSlug() {
      return this.$route.query.newSlug || ''
    },
    shareableUrl() {
      return `${window.location.origin}/${this.newSlug}`
    }
  },
  mounted() {
    // Redirect to home if no slug provided
    if (!this.newSlug) {
      this.$router.push('/')
    }
  },
  methods: {
    async copyUrl() {
      try {
        await navigator.clipboard.writeText(this.shareableUrl)
        this.copied = true
        
        // Reset copied state after 2 seconds
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        this.fallbackCopyToClipboard()
      }
    },
    
    fallbackCopyToClipboard() {
      this.$refs.urlInput.select()
      this.$refs.urlInput.setSelectionRange(0, 99999) // For mobile devices
      
      try {
        document.execCommand('copy')
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (error) {
        console.error('Fallback copy failed:', error)
      }
    },
    
    shareViaEmail() {
      const subject = encodeURIComponent('Shared Text from VueClip')
      const body = encodeURIComponent(`I've shared some text with you using VueClip. You can view it here: ${this.shareableUrl}\n\nPlease note: This link can only be used once and will be deleted after viewing.`)
      window.open(`mailto:?subject=${subject}&body=${body}`)
    },
    
    async shareViaWebShare() {
      if (!this.canShare) return
      
      try {
        await navigator.share({
          title: 'Shared Text from VueClip',
          text: 'I\'ve shared some text with you using VueClip.',
          url: this.shareableUrl
        })
      } catch (error) {
        console.log('Share cancelled or failed:', error)
      }
    },
    
    shareViaTwitter() {
      const text = encodeURIComponent('Check out this secure text I shared using VueClip')
      const url = encodeURIComponent(this.shareableUrl)
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
    },
    
    generateQrCode() {
      // Open QR code generator service
      const url = encodeURIComponent(this.shareableUrl)
      window.open(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${url}`, '_blank')
    },
    
    visitClip() {
      // Warning before visiting
      if (confirm('Are you sure you want to view this clip? It will be permanently deleted after viewing.')) {
        window.open(this.shareableUrl, '_blank')
      }
    }
  }
}
</script>