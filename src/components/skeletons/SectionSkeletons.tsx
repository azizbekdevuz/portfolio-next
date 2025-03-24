// ProjectsSkeleton.tsx
export function ProjectsSkeleton() {
    return (
      <div className="py-20 px-4">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-6 bg-dark-light/50 rounded-md" />
            <div className="w-64 h-10 bg-dark-light/50 rounded-md" />
            <div className="w-12 h-6 bg-dark-light/50 rounded-md" />
            <div className="w-20 h-6 bg-dark-light/50 rounded-md" />
          </div>
          <div className="h-1 w-20 bg-primary/50 rounded-full" />
        </div>
  
        {/* VS Code Editor Style */}
        <div className="relative max-w-6xl mx-auto">
          {/* Editor Header */}
          <div className="h-12 bg-dark-light/80 rounded-t-lg animate-pulse mb-0 flex items-center px-4">
            <div className="w-32 h-4 bg-dark-light/50 rounded-md" />
            <div className="ml-auto flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
          </div>
  
          {/* Editor Body */}
          <div className="flex border border-primary/20 rounded-b-lg">
            {/* File Explorer */}
            <div className="hidden md:block w-64 border-r border-primary/20 bg-dark-light/30 p-4">
              <div className="w-full h-4 bg-dark-light/50 rounded-md mb-4" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full h-6 bg-dark-light/40 rounded-md" />
                ))}
              </div>
            </div>
  
            {/* Main Content */}
            <div className="flex-1 bg-dark-light/20 min-h-[500px] p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-48 h-8 bg-dark-light/40 rounded-md" />
                  <div className="w-full h-20 bg-dark-light/30 rounded-md" />
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-dark-light/40 rounded-md" />
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-20 h-6 bg-dark-light/40 rounded-full" />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <div className="w-32 h-10 bg-primary/30 rounded-md" />
                    <div className="w-32 h-10 bg-dark-light/40 rounded-md" />
                  </div>
                </div>
                <div>
                  <div className="w-full h-8 bg-dark-light/40 rounded-md mb-4" />
                  <div className="w-full h-64 bg-dark-light/30 rounded-md animate-pulse" />
                </div>
              </div>
            </div>
          </div>
  
          {/* Terminal */}
          <div className="h-32 bg-dark-light/80 rounded-b-lg mt-0 p-4">
            <div className="w-32 h-4 bg-dark-light/50 rounded-md mb-3" />
            <div className="space-y-2">
              <div className="w-3/4 h-3 bg-dark-light/40 rounded-md" />
              <div className="w-1/2 h-3 bg-dark-light/40 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // SkillsSkeleton.tsx
  export function SkillsSkeleton() {
    return (
      <div className="py-20 px-4">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-6 bg-dark-light/50 rounded-md" />
            <div className="w-64 h-10 bg-dark-light/50 rounded-md" />
            <div className="w-12 h-6 bg-dark-light/50 rounded-md" />
            <div className="w-20 h-6 bg-dark-light/50 rounded-md" />
          </div>
          <div className="h-1 w-20 bg-primary/50 rounded-full" />
        </div>
  
        {/* Grid Layout */}
        <div className="grid lg:grid-cols-[1.5fr_2.5fr] gap-8 max-w-6xl mx-auto">
          {/* Skill Navigation */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="w-full p-6 rounded-lg bg-dark-light/30 border border-primary/20 animate-pulse"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-dark-light/50 rounded-full" />
                  <div>
                    <div className="w-32 h-6 bg-dark-light/50 rounded-md mb-2" />
                    <div className="w-20 h-4 bg-primary/30 rounded-md" />
                  </div>
                </div>
                <div className="w-full h-12 bg-dark-light/40 rounded-md mb-3" />
                <div className="flex gap-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="w-16 h-6 bg-dark-light/40 rounded-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
  
          {/* Skill Detail */}
          <div className="bg-dark-light/20 rounded-lg p-8 border border-primary/20 min-h-[500px]">
            <div className="mb-8">
              <div className="w-48 h-8 bg-dark-light/50 rounded-md mb-6" />
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-4 rounded-lg bg-dark-light/30 border border-primary/20">
                    <div className="w-10 h-10 bg-dark-light/50 rounded-md mx-auto mb-3" />
                    <div className="w-full h-4 bg-dark-light/40 rounded-md mx-auto" />
                  </div>
                ))}
              </div>
            </div>
  
            <div className="space-y-6">
              <div>
                <div className="w-36 h-6 bg-dark-light/50 rounded-md mb-3" />
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-32 h-8 bg-primary/10 rounded-lg" />
                  ))}
                </div>
              </div>
              <div>
                <div className="w-32 h-6 bg-dark-light/50 rounded-md mb-3" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="w-24 h-8 bg-dark-light/30 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // InProgressSkeleton.tsx
  export function InProgressSkeleton() {
    return (
      <div className="py-20 px-4">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center flex-col">
            <div className="w-72 h-10 bg-dark-light/50 rounded-md mb-5 flex items-center justify-center">
              <div className="w-40 h-6 bg-dark-light/60 rounded-md" />
            </div>
            <div className="w-64 h-2 bg-dark-light/50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary/30 to-primary/50 rounded-full w-2/3" />
            </div>
            <div className="mt-3 font-mono flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary/50" />
              <div className="w-48 h-4 bg-dark-light/50 rounded-md" />
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-dark-light/30 backdrop-blur-sm border border-primary/20 rounded-lg p-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary/30 rounded-md" />
                </div>
              </div>
              <div className="w-72 h-8 bg-dark-light/50 rounded-md mx-auto mb-4" />
              <div className="max-w-2xl mx-auto space-y-2 mb-6">
                <div className="w-full h-4 bg-dark-light/40 rounded-md" />
                <div className="w-full h-4 bg-dark-light/40 rounded-md" />
                <div className="w-3/4 h-4 bg-dark-light/40 rounded-md" />
              </div>
  
              {/* Construction Stages */}
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-dark-light/30 p-6 rounded-lg border border-primary/20">
                    <div className="w-12 h-12 bg-dark-light/50 rounded-full mx-auto mb-4" />
                    <div className="w-32 h-6 bg-primary/30 rounded-md mx-auto mb-2" />
                    <div className="w-full h-12 bg-dark-light/40 rounded-md mb-4" />
                    <div className="w-full h-2.5 bg-dark-light/20 rounded-full">
                      <div className="bg-primary/50 h-2.5 rounded-full" style={{ width: `${30 + i * 15}%` }} />
                    </div>
                    <div className="w-16 h-4 bg-dark-light/40 rounded-md mt-2 ml-auto" />
                  </div>
                ))}
              </div>
  
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-dark-light/30 p-4 rounded-lg border border-primary/10">
                    <div className="w-full h-8 bg-primary/20 rounded-md mb-2" />
                    <div className="w-full h-4 bg-dark-light/40 rounded-md" />
                  </div>
                ))}
              </div>
  
              {/* Button */}
              <div className="flex justify-center mt-6">
                <div className="w-48 h-10 bg-primary/10 border border-primary/30 rounded-full" />
              </div>
  
              {/* Progress bar */}
              <div className="mt-6">
                <div className="w-48 h-4 bg-dark-light/40 rounded-md mx-auto mb-2" />
                <div className="w-full h-2.5 bg-dark-light/30 rounded-full">
                  <div className="bg-primary/60 h-2.5 rounded-full w-2/3" />
                </div>
                <div className="flex justify-between mt-2">
                  <div className="w-24 h-4 bg-dark-light/40 rounded-md" />
                  <div className="w-24 h-4 bg-primary/30 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // ContactSkeleton.tsx
  export function ContactSkeleton() {
    return (
      <div className="py-20 px-4">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-6 bg-dark-light/50 rounded-md" />
            <div className="w-64 h-10 bg-dark-light/50 rounded-md" />
            <div className="w-12 h-6 bg-dark-light/50 rounded-md" />
            <div className="w-20 h-6 bg-dark-light/50 rounded-md" />
          </div>
          <div className="h-1 w-20 bg-primary/50 rounded-full" />
        </div>
  
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Contact Card */}
          <div className="relative">
            <div className="p-8 rounded-lg bg-dark-light/30 border border-primary/20 backdrop-blur-sm overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="w-48 h-8 bg-dark-light/50 rounded-md" />
                <div className="w-36 h-6 bg-dark-light/40 rounded-md" />
                <div className="w-56 h-6 bg-dark-light/40 rounded-md" />
                
                {/* QR Code */}
                <div className="absolute top-4 right-4">
                  <div className="p-2 rounded-lg bg-white/90 w-24 h-24" />
                </div>
                
                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />
              </div>
            </div>
          </div>
  
          {/* Contact Form */}
          <div className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <div className="border border-primary/20 rounded-lg p-2">
                <div className="w-full h-10 bg-dark-light/20 rounded-md" />
              </div>
            </div>
  
            {/* Email Field */}
            <div className="relative">
              <div className="border border-primary/20 rounded-lg p-2">
                <div className="w-full h-10 bg-dark-light/20 rounded-md" />
              </div>
            </div>
  
            {/* Message Field */}
            <div className="relative">
              <div className="border border-primary/20 rounded-lg p-2">
                <div className="w-full h-32 bg-dark-light/20 rounded-md" />
                <div className="w-16 h-4 bg-dark-light/30 rounded-md ml-auto mt-2" />
              </div>
            </div>
  
            {/* Submit Button */}
            <div className="w-full h-12 bg-primary/30 rounded-lg" />
          </div>
        </div>
  
        {/* Social Links Section */}
        <div className="mt-16">
          <div className="bg-dark-light/30 rounded-lg border border-primary/20 overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-dark-light/50 border-b border-primary/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="w-48 h-4 bg-dark-light/40 rounded-md" />
              <div className="w-4 h-4 bg-dark-light/40 rounded-full" />
            </div>
  
            {/* Terminal Body */}
            <div className="p-4 h-32">
              <div className="w-full h-6 bg-dark-light/40 rounded-md mb-4" />
              <div className="w-3/4 h-4 bg-dark-light/30 rounded-md" />
            </div>
  
            {/* Social Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-dark-light/20">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 rounded-lg border backdrop-blur-sm border-primary/20 bg-dark-light/30">
                  <div className="w-10 h-10 mx-auto mb-3 bg-dark-light/40 rounded-full" />
                  <div className="text-center space-y-1">
                    <div className="w-16 h-5 mx-auto bg-dark-light/50 rounded-md" />
                    <div className="w-24 h-4 mx-auto bg-dark-light/40 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
  
            {/* Terminal Footer */}
            <div className="flex items-center justify-between px-4 py-2 bg-dark-light/50 border-t border-primary/20">
              <div className="w-40 h-4 bg-dark-light/40 rounded-md" />
              <div className="w-20 h-4 bg-dark-light/50 rounded-md" />
            </div>
          </div>
        </div>
  
        {/* Language Section */}
        <div className="mt-16 py-6">
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="w-64 h-6 bg-dark-light/50 rounded-md" />
            <div className="w-32 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 rounded-full" />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 rounded-lg border border-primary/20 bg-dark-light/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-dark-light/40 rounded-sm" />
                  <div className="flex-1">
                    <div className="w-24 h-6 bg-dark-light/50 rounded-md mb-1" />
                    <div className="w-16 h-4 bg-primary/30 rounded-md" />
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-1">
                    <div className="w-24 h-4 bg-dark-light/40 rounded-md" />
                    <div className="w-10 h-4 bg-dark-light/40 rounded-md" />
                  </div>
                  <div className="h-2 bg-dark-light/60 rounded-full overflow-hidden">
                    <div className="h-full bg-primary/50 rounded-full" style={{ width: `${50 + i * 10}%` }} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="w-16 h-6 bg-primary/10 rounded-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // HeroSkeleton.tsx
  export function HeroSkeleton() {
    return (
      <div className="h-screen flex items-center justify-center px-4">
        {/* Grid Layout */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-left">
            <div className="w-4/5 h-16 bg-dark-light/50 rounded-lg mb-6 relative">
              <div className="absolute -inset-2 bg-primary/10 rounded-lg blur-2xl" />
            </div>
  
            <div className="w-2/3 h-8 bg-dark-light/40 rounded-lg mb-4" />
  
            {/* IDE Tagline */}
            <div className="bg-dark/30 border border-primary/20 rounded-lg p-4 mb-6">
              <div className="flex mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50 mr-2" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50 mr-2" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-dark-light/30 rounded-md" />
                <div className="w-4/5 h-4 bg-dark-light/30 rounded-md" />
                <div className="w-3/5 h-4 bg-primary/20 rounded-md" />
              </div>
            </div>
  
            {/* Specializations */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="px-4 py-1.5 bg-primary/5 rounded-full border border-primary/20 backdrop-blur-sm">
                  <div className="w-24 h-6 bg-dark-light/30 rounded-md" />
                </div>
              ))}
            </div>
  
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="w-full h-8 bg-primary/20 rounded-md mb-2" />
                  <div className="w-full h-4 bg-dark-light/30 rounded-md" />
                </div>
              ))}
            </div>
  
            {/* Status Indicators */}
            <div className="flex items-center gap-6 mb-8">
              <div className="px-4 py-2 rounded-full bg-primary/5 border border-primary/20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div className="w-36 h-4 bg-dark-light/30 rounded-md" />
              </div>
              <div className="px-4 py-2 rounded-full bg-primary/5 border border-primary/20">
                <div className="w-36 h-4 bg-dark-light/30 rounded-md" />
              </div>
            </div>
  
            {/* CTA Button */}
            <div className="w-40 h-10 bg-primary/20 border border-primary/50 rounded-full" />
          </div>
  
          {/* Profile Section */}
          <div className="relative">
            <div className="w-full aspect-square bg-dark-light/20 rounded-full border-2 border-primary/30 backdrop-blur-lg flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-primary/10 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
  
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-text-secondary/30 rounded-full p-1">
            <div className="w-1.5 h-3 bg-primary/50 rounded-full animate-bounce mx-auto" />
          </div>
        </div>
      </div>
    );
  }
  
  // AboutSkeleton.tsx
  export function AboutSkeleton() {
    return (
      <div className="py-20 px-4">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-6 bg-dark-light/50 rounded-md" />
            <div className="w-48 h-10 bg-dark-light/50 rounded-md" />
            <div className="w-12 h-6 bg-dark-light/50 rounded-md" />
            <div className="w-16 h-6 bg-dark-light/50 rounded-md" />
          </div>
          <div className="h-1 w-20 bg-primary/50 rounded-full" />
        </div>
  
        {/* Bio Section */}
        <div className="max-w-6xl mx-auto bg-dark-light/20 rounded-lg p-6 border border-primary/20 mb-16">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="w-full aspect-square bg-dark-light/30 rounded-2xl mb-4 animate-pulse" />
              <div className="space-y-2">
                <div className="w-full h-5 bg-dark-light/40 rounded-md" />
                <div className="w-4/5 h-5 bg-dark-light/40 rounded-md" />
              </div>
            </div>
            <div className="md:w-2/3 space-y-4">
              <div className="w-48 h-8 bg-primary/30 rounded-md" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-dark-light/40 rounded-md" />
                <div className="w-full h-4 bg-dark-light/40 rounded-md" />
                <div className="w-full h-4 bg-dark-light/40 rounded-md" />
                <div className="w-4/5 h-4 bg-dark-light/40 rounded-md" />
              </div>
              <div className="space-y-2 pt-4">
                <div className="w-full h-4 bg-dark-light/40 rounded-md" />
                <div className="w-full h-4 bg-dark-light/40 rounded-md" />
                <div className="w-3/4 h-4 bg-dark-light/40 rounded-md" />
              </div>
            </div>
          </div>
        </div>
  
        {/* Journey Timeline */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="w-48 h-8 bg-dark-light/50 rounded-md mx-auto mb-10" />
          <div className="relative pl-10 border-l-2 border-primary/30 space-y-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] w-8 h-8 rounded-full bg-primary/20 border-4 border-dark" />
                <div className="w-24 h-5 bg-primary/30 rounded-md mb-2" />
                <div className="w-48 h-7 bg-dark-light/50 rounded-md mb-3" />
                <div className="p-4 bg-dark-light/20 rounded-lg border border-primary/20">
                  <div className="space-y-2 mb-4">
                    <div className="w-full h-4 bg-dark-light/30 rounded-md" />
                    <div className="w-full h-4 bg-dark-light/30 rounded-md" />
                    <div className="w-2/3 h-4 bg-dark-light/30 rounded-md" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="px-3 py-1.5 bg-primary/10 rounded-full">
                        <div className="w-16 h-4 bg-dark-light/40 rounded-md" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Tech Stack */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="w-56 h-8 bg-dark-light/50 rounded-md mx-auto mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="p-4 bg-dark-light/20 rounded-lg border border-primary/20 flex flex-col items-center">
                <div className="w-16 h-16 bg-dark-light/30 rounded-md mb-3" />
                <div className="w-24 h-5 bg-dark-light/40 rounded-md mb-2" />
                <div className="w-full h-4 bg-dark-light/30 rounded-md mb-2" />
                <div className="w-3/4 h-1 bg-primary/30 rounded-full" />
              </div>
            ))}
          </div>
        </div>
  
        {/* Achievements */}
        <div className="max-w-6xl mx-auto">
          <div className="w-64 h-8 bg-dark-light/50 rounded-md mx-auto mb-10" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-dark-light/20 rounded-lg border border-primary/20 p-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full mb-4 mx-auto" />
                <div className="w-36 h-6 bg-dark-light/40 rounded-md mx-auto mb-3" />
                <div className="space-y-2 mb-4">
                  <div className="w-full h-4 bg-dark-light/30 rounded-md" />
                  <div className="w-full h-4 bg-dark-light/30 rounded-md" />
                  <div className="w-2/3 h-4 bg-dark-light/30 rounded-md mx-auto" />
                </div>
                <div className="w-24 h-6 bg-primary/20 rounded-full mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Create a SkeletonWrapper component that provides consistent behaviors
  export function SkeletonWrapper({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen py-6">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_30%,rgba(20,157,221,0.02),transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)]
                     bg-[size:3rem_3rem] opacity-40" />
        </div>
        
        {/* Skeleton Content */}
        {children}
      </div>
    );
  }