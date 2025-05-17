import { 
  Palette, 
  Sailboat, 
  Laptop, 
  Camera, 
  Sparkles, 
  Hourglass, 
  SparkleIcon, 
  Building 
} from 'lucide-react';

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  vibePoints: Record<string, number>;
}

export interface VibeType {
  id: string;
  name: string;
  emoji: string;
  icon: React.ElementType;
  color: string;
  description: string;
  backgroundGradient: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "It's Friday night. What are your plans?",
    options: [
      {
        id: "1a",
        text: "Whatever happens, happens! I'm open to anything.",
        vibePoints: { chaoticGood: 3, mainCharacter: 2, cosmicBeing: 1 }
      },
      {
        id: "1b",
        text: "A cozy night in with tea, books, and soft music.",
        vibePoints: { cottagecore: 3, oldSoul: 2, artsy: 1 }
      },
      {
        id: "1c",
        text: "Networking event or working on my side project.",
        vibePoints: { techBro: 3, corporateGoth: 2 }
      },
      {
        id: "1d",
        text: "Art gallery opening, then a trendy new restaurant.",
        vibePoints: { artsy: 3, mainCharacter: 2 }
      }
    ]
  },
  {
    id: 2,
    text: "Pick a vacation destination:",
    options: [
      {
        id: "2a",
        text: "A cabin in the woods with no WiFi.",
        vibePoints: { cottagecore: 3, oldSoul: 2 }
      },
      {
        id: "2b",
        text: "Tokyo: neon lights and cutting-edge technology.",
        vibePoints: { techBro: 3, chaoticGood: 1, corporateGoth: 1 }
      },
      {
        id: "2c",
        text: "Road trip with no fixed itinerary.",
        vibePoints: { chaoticGood: 3, mainCharacter: 2, cosmicBeing: 1 }
      },
      {
        id: "2d",
        text: "Paris or another historic art capital.",
        vibePoints: { artsy: 3, oldSoul: 1 }
      }
    ]
  },
  {
    id: 3,
    text: "Your phone battery is at 5%. You use your last bit of power to:",
    options: [
      {
        id: "3a",
        text: "Check work emails and Slack messages.",
        vibePoints: { techBro: 3, corporateGoth: 2 }
      },
      {
        id: "3b",
        text: "Take one more photo of the sunset/cityscape.",
        vibePoints: { artsy: 3, mainCharacter: 2 }
      },
      {
        id: "3c",
        text: "Send a thoughtful message to someone you care about.",
        vibePoints: { oldSoul: 3, cottagecore: 1 }
      },
      {
        id: "3d",
        text: "Google an existential question that popped into your head.",
        vibePoints: { cosmicBeing: 3, chaoticGood: 1 }
      }
    ]
  },
  {
    id: 4,
    text: "What's on your desk/workspace?",
    options: [
      {
        id: "4a",
        text: "Multiple monitors, tech gadgets, and energy drinks.",
        vibePoints: { techBro: 3, corporateGoth: 1 }
      },
      {
        id: "4b",
        text: "Art supplies, journals, and inspirational imagery.",
        vibePoints: { artsy: 3, cottagecore: 1 }
      },
      {
        id: "4c",
        text: "Organized chaos - you know where everything is, mostly.",
        vibePoints: { chaoticGood: 3, mainCharacter: 1, cosmicBeing: 1 }
      },
      {
        id: "4d",
        text: "Minimalist, clean, with a few carefully chosen items.",
        vibePoints: { corporateGoth: 3, oldSoul: 2 }
      }
    ]
  },
  {
    id: 5,
    text: "You're hosting a dinner party. What's on the menu?",
    options: [
      {
        id: "5a",
        text: "Farm-to-table, seasonal ingredients I grew myself.",
        vibePoints: { cottagecore: 3, oldSoul: 1 }
      },
      {
        id: "5b",
        text: "Takeout from the trendy new spot everyone's talking about.",
        vibePoints: { mainCharacter: 3, techBro: 1 }
      },
      {
        id: "5c",
        text: "Experimental fusion cuisine with artistic plating.",
        vibePoints: { artsy: 3, cosmicBeing: 2, chaoticGood: 1 }
      },
      {
        id: "5d",
        text: "A carefully curated selection of international dishes.",
        vibePoints: { corporateGoth: 2, oldSoul: 2, techBro: 1 }
      }
    ]
  },
  {
    id: 6,
    text: "Your friends would describe you as:",
    options: [
      {
        id: "6a",
        text: "The spontaneous one who's always up for an adventure.",
        vibePoints: { chaoticGood: 3, mainCharacter: 2 }
      },
      {
        id: "6b",
        text: "The creative one with unique perspectives.",
        vibePoints: { artsy: 3, cosmicBeing: 2 }
      },
      {
        id: "6c",
        text: "The reliable one who gives thoughtful advice.",
        vibePoints: { oldSoul: 3, corporateGoth: 1 }
      },
      {
        id: "6d",
        text: "The ambitious one who's always working on something new.",
        vibePoints: { techBro: 3, mainCharacter: 1 }
      }
    ]
  },
  {
    id: 7,
    text: "It's 3 AM and you can't sleep. What are you doing?",
    options: [
      {
        id: "7a",
        text: "Scrolling through social media or watching YouTube.",
        vibePoints: { mainCharacter: 2, techBro: 2, chaoticGood: 1 }
      },
      {
        id: "7b",
        text: "Contemplating existence and your place in the universe.",
        vibePoints: { cosmicBeing: 3, oldSoul: 2 }
      },
      {
        id: "7c",
        text: "Working on a creative project or learning something new.",
        vibePoints: { artsy: 3, techBro: 1 }
      },
      {
        id: "7d",
        text: "Making tea and reading or journaling by soft light.",
        vibePoints: { cottagecore: 3, oldSoul: 2 }
      }
    ]
  },
  {
    id: 8,
    text: "Pick a motto that resonates with you:",
    options: [
      {
        id: "8a",
        text: 'Go with the flow.',
        vibePoints: { chaoticGood: 3, cosmicBeing: 2 }
      },
      {
        id: "8b",
        text: 'Live life as a work of art.',
        vibePoints: { artsy: 3, mainCharacter: 2 }
      },
      {
        id: "8c",
        text: 'Innovate or die.',
        vibePoints: { techBro: 3, corporateGoth: 1 }
      },
      {
        id: "8d",
        text: 'Slow living, deep thinking.',
        vibePoints: { oldSoul: 3, cottagecore: 2 }
      }
    ]
  }
];

export const vibeTypes: Record<string, VibeType> = {
  chaoticGood: {
    id: "chaoticGood",
    name: "Chaotic Good",
    emoji: "✨",
    icon: Sparkles,
    color: "bg-vibes-chaoticGood",
    description: "You're spontaneous, fun-loving, and always up for an adventure. Rules are more like suggestions to you, but your heart's in the right place.",
    backgroundGradient: "from-vibes-chaoticGood to-pink-500"
  },
  cottagecore: {
    id: "cottagecore",
    name: "Cottagecore",
    emoji: "🌿",
    icon: Sailboat,
    color: "bg-vibes-cottagecore",
    description: "You value simplicity, nature, and homemade comfort. Your ideal day involves gardening, baking bread, and reading by a window.",
    backgroundGradient: "from-vibes-cottagecore to-green-600"
  },
  techBro: {
    id: "techBro",
    name: "Tech Enthusiast",
    emoji: "💻",
    icon: Laptop,
    color: "bg-vibes-techBro",
    description: "Always on the cutting edge, you love innovation and efficiency. You probably have strong opinions about programming languages or operating systems.",
    backgroundGradient: "from-vibes-techBro to-blue-600"
  },
  artsy: {
    id: "artsy",
    name: "Creative Soul",
    emoji: "🎨",
    icon: Palette,
    color: "bg-vibes-artsy",
    description: "You see beauty and meaning in everything. Your life is a canvas for expression, and you're drawn to unique aesthetics and ideas.",
    backgroundGradient: "from-vibes-artsy to-purple-700"
  },
  mainCharacter: {
    id: "mainCharacter",
    name: "Main Character",
    emoji: "🌟",
    icon: Camera,
    color: "bg-vibes-mainCharacter",
    description: "Life is your movie, and you're the star. You have a flair for the dramatic and know how to make every moment count.",
    backgroundGradient: "from-vibes-mainCharacter to-yellow-500"
  },
  oldSoul: {
    id: "oldSoul",
    name: "Old Soul",
    emoji: "🕰️",
    icon: Hourglass,
    color: "bg-vibes-oldSoul",
    description: "You have wisdom beyond your years and appreciate timeless things. Tradition, history, and deep conversations are your comfort zone.",
    backgroundGradient: "from-vibes-oldSoul to-amber-700"
  },
  cosmicBeing: {
    id: "cosmicBeing",
    name: "Cosmic Being",
    emoji: "🌌",
    icon: SparkleIcon,
    color: "bg-vibes-cosmicBeing",
    description: "You're tuned into the universe's wavelength. Synchronicities are everywhere, and you're on a constant journey of spiritual exploration.",
    backgroundGradient: "from-vibes-cosmicBeing to-blue-400"
  },
  corporateGoth: {
    id: "corporateGoth",
    name: "Corporate Goth",
    emoji: "🖤",
    icon: Building,
    color: "bg-vibes-corporateGoth",
    description: "Professionally polished with an edge, you balance ambition with a dark sense of humor. Black coffee and existential dread are your fuel.",
    backgroundGradient: "from-vibes-corporateGoth to-gray-700"
  }
};