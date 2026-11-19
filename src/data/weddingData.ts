export interface ParentInfo {
  prefix: string;
  name: string;
}

export interface PersonInfo {
  first: string;
  full: string;
  parents: {
    father: ParentInfo;
    mother: ParentInfo;
  };
}

export interface WeddingEvent {
  id: string;
  name: string;
  artwork: string;
  date: string; // YYYY-MM-DD
  dateFormatted?: string;
  time: string; // 24h
  timeFormatted?: string;
  venue: string;
  address: string;
  maps: string;
  dressCode: string;
  note: string;
  countdown: boolean;
}

export interface StoryMoment {
  when: string;
  heading: string;
  body: string;
  photo: string;
}

export interface ContactPerson {
  name: string;
  phone: string;
}

export interface WeddingData {
  design: string;
  slug: string;
  targetDate: string; // ISO format with timezone
  targetDateDisplay: {
    dayOfWeek: string;
    dayNum: string;
    daySuffix: string;
    month: string;
    year: string;
    timeText: string;
  };
  couple: {
    order: 'groom' | 'bride';
    groom: PersonInfo;
    bride: PersonInfo;
    hostedBy: string;
  };
  blessing: {
    deity: string;
    invocation: string;
    script: string;
    symbolSrc: string;
    symbolLang: string;
  };
  hashtag: string;
  venue: {
    name: string;
    address: string;
    mapsUrl: string;
    mandapImage: string;
  };
  events: WeddingEvent[];
  story: StoryMoment[];
  media: {
    logo: string;
    music: string;
    musicSrc: string;
    gallery: { src: string; caption?: string }[];
    video: {
      provider: 'youtube';
      id: string;
      poster: string;
    };
  };
  connect: {
    instagram: string;
    rsvp: {
      mode: string;
      contacts: ContactPerson[];
    };
  };
}

export const weddingData: WeddingData = {
  design: "nimantran",
  slug: "aarav-ananya-demo",
  targetDate: "2027-12-04T19:40:00+05:30",
  targetDateDisplay: {
    dayOfWeek: "Saturday",
    dayNum: "4",
    daySuffix: "th",
    month: "December",
    year: "2027",
    timeText: "7:40 pm onwards",
  },
  couple: {
    order: "groom",
    groom: {
      first: "Aarav",
      full: "Aarav Malhotra",
      parents: {
        father: {
          prefix: "Shri",
          name: "Rajesh Malhotra",
        },
        mother: {
          prefix: "Smt",
          name: "Priya Malhotra",
        },
      },
    },
    bride: {
      first: "Ananya",
      full: "Ananya Sharma",
      parents: {
        father: {
          prefix: "Shri",
          name: "Vikram Sharma",
        },
        mother: {
          prefix: "Smt",
          name: "Meera Sharma",
        },
      },
    },
    hostedBy: "Shri Mohan & Smt Kamla Malhotra\nShri Suresh & Smt Lata Sharma",
  },
  blessing: {
    deity: "ganesha",
    invocation: "॥ श्री गणेशाय नमः ॥",
    script: "native",
    symbolSrc: "/assets/ganesha.webp",
    symbolLang: "sa",
  },
  hashtag: "#ForeverAarananya",
  venue: {
    name: "Radisson Blu Hotel, New Delhi Dwarka",
    address: "Dwarka City Centre, Plot 4, Sector 13\nDwarka, New Delhi 110075",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Radisson%20Blu%20Hotel%20New%20Delhi%20Dwarka&destination_place_id=ChIJNVRyWcgaDTkRj3BVa6ccnAo",
    mandapImage: "/assets/el/mandap.webp",
  },
  events: [
    {
      id: "ev-1",
      name: "Engagement",
      artwork: "/assets/events/engagement.webp",
      date: "2027-11-30",
      dateFormatted: "Tuesday, 30th November 2027",
      time: "19:00",
      timeFormatted: "7:00 pm onwards",
      venue: "Radisson Blu Hotel, New Delhi Dwarka",
      address: "Dwarka City Centre, Sector 13",
      maps: "https://www.google.com/maps/search/?api=1&query=Radisson+Blu+Hotel+Dwarka",
      dressCode: "Indo-western",
      note: "Ring ceremony, dinner to follow",
      countdown: false,
    },
    {
      id: "ev-2",
      name: "Haldi",
      artwork: "/assets/events/haldi.webp",
      date: "2027-12-01",
      dateFormatted: "Wednesday, 1st December 2027",
      time: "10:30",
      timeFormatted: "10:30 am onwards",
      venue: "Radisson Blu Hotel, New Delhi Dwarka",
      address: "Dwarka City Centre, Sector 13",
      maps: "https://www.google.com/maps/search/?api=1&query=Radisson+Blu+Hotel+Dwarka",
      dressCode: "Marigold & ivory",
      note: "Breakfast & haldi from 10:30",
      countdown: false,
    },
    {
      id: "ev-3",
      name: "Mehndi",
      artwork: "/assets/events/mehndi.webp",
      date: "2027-12-02",
      dateFormatted: "Thursday, 2nd December 2027",
      time: "16:00",
      timeFormatted: "4:00 pm onwards",
      venue: "Radisson Blu Hotel, New Delhi Dwarka",
      address: "Dwarka City Centre, Sector 13",
      maps: "https://www.google.com/maps/search/?api=1&query=Radisson+Blu+Hotel+Dwarka",
      dressCode: "Sage & blush",
      note: "High tea & henna all evening",
      countdown: false,
    },
    {
      id: "ev-4",
      name: "Sangeet",
      artwork: "/assets/events/sangeet.webp",
      date: "2027-12-03",
      dateFormatted: "Friday, 3rd December 2027",
      time: "19:30",
      timeFormatted: "7:30 pm onwards",
      venue: "Radisson Blu Hotel, New Delhi Dwarka",
      address: "Dwarka City Centre, Sector 13",
      maps: "https://www.google.com/maps/search/?api=1&query=Radisson+Blu+Hotel+Dwarka",
      dressCode: "Cocktail glamour",
      note: "Performances & dinner",
      countdown: false,
    },
    {
      id: "ev-5",
      name: "Wedding",
      artwork: "/assets/events/wedding.webp",
      date: "2027-12-04",
      dateFormatted: "Saturday, 4th December 2027",
      time: "19:40",
      timeFormatted: "7:40 pm onwards",
      venue: "Radisson Blu Hotel, New Delhi Dwarka",
      address: "Dwarka City Centre, Sector 13",
      maps: "https://www.google.com/maps/search/?api=1&query=Radisson+Blu+Hotel+Dwarka",
      dressCode: "Traditional formal",
      note: "Dinner after the pheras",
      countdown: true,
    },
    {
      id: "ev-6",
      name: "Reception",
      artwork: "/assets/events/reception.webp",
      date: "2027-12-05",
      dateFormatted: "Sunday, 5th December 2027",
      time: "19:30",
      timeFormatted: "7:30 pm onwards",
      venue: "Radisson Blu Hotel, New Delhi Dwarka",
      address: "Dwarka City Centre, Sector 13",
      maps: "https://www.google.com/maps/search/?api=1&query=Radisson+Blu+Hotel+Dwarka",
      dressCode: "Black tie",
      note: "Dinner & celebration",
      countdown: false,
    },
  ],
  story: [
    {
      when: "June 2021",
      heading: "The first hello",
      body: "A conversation neither of us wanted to end.",
      photo: "/assets/story/first-meet.webp",
    },
    {
      when: "February 2022",
      heading: "Somewhere along the way",
      body: "The ordinary days began to feel like the good ones.",
      photo: "/assets/story/dating.webp",
    },
    {
      when: "December 2025",
      heading: "The question",
      body: "One of us asked. The other already knew the answer.",
      photo: "/assets/story/proposal.webp",
    },
    {
      when: "August 2026",
      heading: "Two families, one table",
      body: "And a date set for the celebrations.",
      photo: "/assets/gallery/1.webp",
    },
  ],
  media: {
    logo: "/assets/couple-logo.webp",
    music: "Wedding melody",
    musicSrc: "/assets/music.mp3",
    gallery: [
      { src: "/assets/gallery/1.webp", caption: "Two families, one celebration" },
      { src: "/assets/gallery/2.webp", caption: "Moments of love" },
      { src: "/assets/gallery/3.webp", caption: "Together forever" },
      { src: "/assets/story/first-meet.webp", caption: "The beginning" },
      { src: "/assets/story/dating.webp", caption: "Cherished days" },
      { src: "/assets/story/proposal.webp", caption: "The unforgettable question" },
      { src: "/assets/hero-1.webp", caption: "Royal palace blessings" },
    ],
    video: {
      provider: "youtube",
      id: "Kni0Nd76X5A",
      poster: "/assets/story/proposal.webp",
    },
  },
  connect: {
    instagram: "aarav.ananya",
    rsvp: {
      mode: "phone",
      contacts: [
        {
          name: "Rohan Malhotra",
          phone: "+919810012345",
        },
        {
          name: "Isha Sharma",
          phone: "+919810034567",
        },
      ],
    },
  },
};

