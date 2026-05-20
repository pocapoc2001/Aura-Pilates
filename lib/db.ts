export type User = {
  id: string;
  name: string;
  credit_balance: number;
}

export type Studio = {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  rating: number;
  amenities: string[];
  images: string[];
}

export type ClassSession = {
  id: string;
  title: string;
  studio_id: string;
  studio: string;
  focus: string; // e.g. "Reformer Intro", "Mat Pilates Advanced"
  activity_type: "Reformer" | "Mat Pilates" | "Yoga" | "Barre";
  time_of_day: "Morning" | "Afternoon" | "Evening";
  date: string;
  time: string;
  price: number;
  spots_total: number;
  booked_spots: number;
  lat: number;
  lng: number;
}

export type Booking = {
  id: string;
  user_id: string;
  class_id: string;
  created_at: string;
}

// Use an in-memory fallback for SSR or initial load before localStorage is available
let localCache: { [key: string]: string } = {};

const isBrowser = typeof window !== "undefined";

const INITIAL_STUDIOS: Studio[] = [
  {
    id: "std_1",
    name: "Aura Core Dorobanti",
    description: "Our flagship location featuring state-of-the-art align reformers and a calming minimal aesthetic. Natural light floods the space, perfect for your morning flow.",
    lat: 44.456,
    lng: 26.095,
    rating: 4.9,
    amenities: ["Shower", "Towels", "Matcha Bar", "Lockers"],
    images: ["https://picsum.photos/seed/aura1/800/600", "https://picsum.photos/seed/aura2/800/600", "https://picsum.photos/seed/aura3/800/600"]
  },
  {
    id: "std_2",
    name: "Aesthetic Core Floreasca",
    description: "An elite mat pilates studio with sweeping views of the park. Focusing on breathwork, deep core engagement, and longevity.",
    lat: 44.467,
    lng: 26.102,
    rating: 4.8,
    amenities: ["Towels", "Changing Rooms", "Filtered Water"],
    images: ["https://picsum.photos/seed/aes1/800/600", "https://picsum.photos/seed/aes2/800/600"]
  },
  {
    id: "std_3",
    name: "Zenith Primăverii",
    description: "Exclusive, intimate environment. Known for intensive postural correction and specialized stretch apparatus.",
    lat: 44.469,
    lng: 26.089,
    rating: 5.0,
    amenities: ["Shower", "Towels", "Matcha Bar", "Valet Parking"],
    images: ["https://picsum.photos/seed/zen1/800/600", "https://picsum.photos/seed/zen2/800/600", "https://picsum.photos/seed/zen3/800/600", "https://picsum.photos/seed/zen4/800/600"]
  }
];

const INITIAL_CLASSES: ClassSession[] = [
  {
    id: "cls_1",
    title: "Morning Flow",
    studio_id: "std_1",
    studio: "Aura Core Dorobanti",
    focus: "Reformer Intro",
    activity_type: "Reformer",
    time_of_day: "Morning",
    date: "2026-05-21",
    time: "08:00 AM",
    price: 2,
    spots_total: 10,
    booked_spots: 8,
    lat: 44.456,
    lng: 26.095,
  },
  {
    id: "cls_2",
    title: "Advanced Posture",
    studio_id: "std_1",
    studio: "Aura Core Dorobanti",
    focus: "Reformer Advanced",
    activity_type: "Reformer",
    time_of_day: "Morning",
    date: "2026-05-21",
    time: "10:00 AM",
    price: 3,
    spots_total: 8,
    booked_spots: 8,
    lat: 44.456,
    lng: 26.095,
  },
  {
    id: "cls_3",
    title: "Core Stability",
    studio_id: "std_2",
    studio: "Aesthetic Core Floreasca",
    focus: "Mat Pilates",
    activity_type: "Mat Pilates",
    time_of_day: "Morning",
    date: "2026-05-22",
    time: "07:30 AM",
    price: 1,
    spots_total: 15,
    booked_spots: 5,
    lat: 44.467,
    lng: 26.102,
  },
  {
    id: "cls_4",
    title: "Longevity Stretch",
    studio_id: "std_3",
    studio: "Zenith Primăverii",
    focus: "Reformer Stretch",
    activity_type: "Reformer",
    time_of_day: "Evening",
    date: "2026-05-22",
    time: "18:00 PM",
    price: 2,
    spots_total: 12,
    booked_spots: 11,
    lat: 44.469,
    lng: 26.089,
  },
  {
    id: "cls_5",
    title: "Lunch Barre",
    studio_id: "std_2",
    studio: "Aesthetic Core Floreasca",
    focus: "Barre Sculpt",
    activity_type: "Barre",
    time_of_day: "Afternoon",
    date: "2026-05-22",
    time: "13:00 PM",
    price: 2,
    spots_total: 15,
    booked_spots: 2,
    lat: 44.467,
    lng: 26.102,
  },
  {
    id: "cls_6",
    title: "Sunset Yoga Flow",
    studio_id: "std_3",
    studio: "Zenith Primăverii",
    focus: "Vinyasa",
    activity_type: "Yoga",
    time_of_day: "Evening",
    date: "2026-05-23",
    time: "19:30 PM",
    price: 2,
    spots_total: 20,
    booked_spots: 12,
    lat: 44.469,
    lng: 26.089,
  }
];

const INITIAL_USER: User = {
  id: "usr_1",
  name: "Alexandru",
  credit_balance: 20,
};

function getStorage(key: string) {
  if (isBrowser) {
    return localStorage.getItem(key);
  }
  return localCache[key] || null;
}

function setStorage(key: string, value: string) {
  if (isBrowser) {
    localStorage.setItem(key, value);
  } else {
    localCache[key] = value;
  }
}

// Utility to act as our Database Connection
export const supabaseMock = {
  initialize() {
    if (!getStorage("aura_studios")) {
      setStorage("aura_studios", JSON.stringify(INITIAL_STUDIOS));
    }
    if (!getStorage("aura_classes")) {
      setStorage("aura_classes", JSON.stringify(INITIAL_CLASSES));
    }
    if (!getStorage("aura_user")) {
      setStorage("aura_user", JSON.stringify(INITIAL_USER));
    }
    if (!getStorage("aura_bookings")) {
      setStorage("aura_bookings", JSON.stringify([]));
    }
  },

  async getStudios(): Promise<Studio[]> {
    this.initialize();
    return JSON.parse(getStorage("aura_studios") || "[]");
  },

  async getStudioById(id: string): Promise<Studio | null> {
    const studios = await this.getStudios();
    return studios.find((s) => s.id === id) || null;
  },

  async getClasses(): Promise<ClassSession[]> {
    this.initialize();
    return JSON.parse(getStorage("aura_classes") || "[]");
  },

  async getUser(): Promise<User> {
    this.initialize();
    return JSON.parse(getStorage("aura_user") || "{}");
  },

  async addCredits(amount: number): Promise<{ success: boolean }> {
    const user = await this.getUser();
    const updatedUser = { ...user, credit_balance: user.credit_balance + amount };
    setStorage("aura_user", JSON.stringify(updatedUser));
    return { success: true };
  },

  async getBookings(): Promise<Booking[]> {
    this.initialize();
    return JSON.parse(getStorage("aura_bookings") || "[]");
  },

  async bookClass(classId: string): Promise<{ success: boolean; message: string }> {
    // Atomic transaction simulation
    const classes: ClassSession[] = await this.getClasses();
    const user: User = await this.getUser();
    const bookings: Booking[] = await this.getBookings();

    const targetClass = classes.find((c) => c.id === classId);
    if (!targetClass) return { success: false, message: "Class not found" };

    // 1. Prevent Duplicates
    const alreadyBooked = bookings.some((b) => b.class_id === classId);
    if (alreadyBooked) return { success: false, message: "Already Booked" };

    // 2. Check Spots
    if (targetClass.booked_spots >= targetClass.spots_total) {
      return { success: false, message: "Class is full" };
    }

    // 3. Check Credits
    if (user.credit_balance < targetClass.price) {
      return { success: false, message: "Insufficient credits" };
    }

    // Perform atomic update
    const updatedClass = { ...targetClass, booked_spots: targetClass.booked_spots + 1 };
    const updatedClasses = classes.map((c) => (c.id === classId ? updatedClass : c));
    
    const updatedUser = { ...user, credit_balance: user.credit_balance - targetClass.price };
    
    const newBooking: Booking = {
      id: `bkg_${Math.random().toString(36).substring(2, 9)}`,
      user_id: user.id,
      class_id: classId,
      created_at: new Date().toISOString(),
    };
    const updatedBookings = [...bookings, newBooking];

    // Commit to simulate DB saving
    setStorage("aura_classes", JSON.stringify(updatedClasses));
    setStorage("aura_user", JSON.stringify(updatedUser));
    setStorage("aura_bookings", JSON.stringify(updatedBookings));

    return { success: true, message: "Booked successfully" };
  },

  async cancelBooking(bookingId: string): Promise<{ success: boolean; message: string }> {
    const bookings: Booking[] = await this.getBookings();
    const classes: ClassSession[] = await this.getClasses();
    const user: User = await this.getUser();

    const bookingIndex = bookings.findIndex((b) => b.id === bookingId);
    if (bookingIndex === -1) return { success: false, message: "Booking not found" };

    const bookingToCancel = bookings[bookingIndex];
    const targetClass = classes.find((c) => c.id === bookingToCancel.class_id);

    if (!targetClass) return { success: false, message: "Associated class not found" };

    // Perform atomic refund
    const updatedBookings = bookings.filter((b) => b.id !== bookingId);
    const updatedClass = { ...targetClass, booked_spots: Math.max(0, targetClass.booked_spots - 1) };
    const updatedClasses = classes.map((c) => (c.id === targetClass.id ? updatedClass : c));
    const updatedUser = { ...user, credit_balance: user.credit_balance + targetClass.price };

    // Commit
    setStorage("aura_classes", JSON.stringify(updatedClasses));
    setStorage("aura_user", JSON.stringify(updatedUser));
    setStorage("aura_bookings", JSON.stringify(updatedBookings));

    return { success: true, message: "Canceled successfully" };
  },
};
