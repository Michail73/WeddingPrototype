const pool = require('../config/database');

const sampleVendors = [
  // Spaces for Rent
  {
    name: 'Grand Ballroom Estate',
    category: 'Spaces for Rent',
    description: 'Step into timeless elegance at the Grand Ballroom Estate, where dreams come to life under sparkling crystal chandeliers. Our magnificent 8,000 square foot ballroom features soaring 20-foot ceilings, pristine white columns, and a breathtaking grand staircase perfect for your entrance. Accommodate up to 300 guests in comfort with our flexible floor plan. The venue includes a stunning outdoor garden courtyard with a decorative fountain, ideal for cocktail hour or ceremony. Our comprehensive package includes elegant Chiavari chairs, premium linens, full bar service, and a dedicated event coordinator. Complimentary amenities include a spacious bridal suite with private bathroom, groom\'s lounge, valet parking for 200+ vehicles, and state-of-the-art sound system with wireless microphones. Climate-controlled comfort year-round.',
    contact_email: 'info@grandballroom.com',
    contact_phone: '(555) 123-4567',
    website: 'www.grandballroom.com',
    address: '123 Elegant Drive',
    city: 'New York',
    state: 'NY',
    price_range: '$$$',
    min_price: 5000,
    max_price: 15000,
    images: ['https://images.unsplash.com/photo-1519167758481-83f29da8c0c2?w=800', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800', 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800', 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800']
  },
  {
    name: 'Rustic Barn Venue',
    category: 'Spaces for Rent',
    description: 'Experience the perfect blend of rustic charm and modern amenities at our beautifully restored 1920s barn venue. Nestled on 50 acres of rolling hills with panoramic countryside views, our authentic timber-frame barn features original hand-hewn beams, vintage barn doors, and romantic Edison bulb lighting. The climate-controlled interior comfortably seats 200 guests for dinner and dancing. Our venue includes a stunning outdoor ceremony site under century-old oak trees, a covered pavilion for cocktail hour, and picturesque photo locations throughout the property including a vintage pickup truck, white chapel, and wooden bridge over a creek. Package includes farm tables, crossback chairs, bar setup, and exclusive venue access from morning until midnight. Private bridal suite and groom\'s quarters with modern bathrooms. Professional event staff included. Perfect for couples seeking an authentic farm wedding experience with Instagram-worthy backdrops at every turn.',
    contact_email: 'bookings@rusticbarn.com',
    contact_phone: '(555) 234-5678',
    website: 'www.rusticbarnvenue.com',
    address: '456 Country Road',
    city: 'Nashville',
    state: 'TN',
    price_range: '$$',
    min_price: 3000,
    max_price: 8000,
    images: ['https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800', 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800']
  },
  {
    name: 'Oceanview Terrace',
    category: 'Spaces for Rent',
    description: 'Breathtaking oceanfront venue with panoramic Pacific views and stunning sunsets. Our contemporary glass-walled pavilion seamlessly blends indoor and outdoor spaces, featuring floor-to-ceiling windows, a wrap-around terrace, and direct beach access. Ideal for 150 guests with flexible seating arrangements. The venue includes a modern cocktail lounge, professional kitchen, and beautifully landscaped grounds with palm trees and tropical flowers. Say your vows on our white sand beach ceremony area with the sound of waves as your soundtrack. Perfect for couples seeking a romantic coastal wedding with unbeatable ocean views. All-inclusive packages available with tables, chairs, and lighting.',
    contact_email: 'events@oceanviewterrace.com',
    contact_phone: '(555) 321-7890',
    website: 'www.oceanviewterrace.com',
    address: '789 Coastal Highway',
    city: 'Santa Barbara',
    state: 'CA',
    price_range: '$$$$',
    min_price: 8000,
    max_price: 20000,
    images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=800', 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800', 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800']
  },
  // Restaurants
  {
    name: 'La Maison French Bistro',
    category: 'Restaurants',
    description: 'Indulge in the romance of Paris at La Maison, San Francisco\'s premier French bistro for intimate wedding celebrations. Our three private dining rooms feature classic French décor with vintage chandeliers, exposed brick walls, and elegant drapery. Executive Chef Pierre Dubois crafts exquisite customized menus featuring authentic French cuisine with locally-sourced ingredients. Choose from classic dishes like Coq au Vin, Beef Bourguignon, or fresh seafood from our daily market selection. Our sommelier will pair each course with wines from our 500+ bottle cellar. Capacity: 150 guests for seated dinner. Full-service staff included, from champagne reception to coffee service. Perfect for couples seeking sophistication and culinary excellence. Vegetarian, vegan, and gluten-free options available. Complimentary tasting for bride and groom.',
    contact_email: 'events@lamaison.com',
    contact_phone: '(555) 345-6789',
    website: 'www.lamaisonbistro.com',
    address: '789 Gourmet Lane',
    city: 'San Francisco',
    state: 'CA',
    price_range: '$$$$',
    min_price: 100,
    max_price: 250,
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800']
  },
  {
    name: 'Bella Vista Italian Restaurant',
    category: 'Restaurants',
    description: 'Experience authentic Italian hospitality at Bella Vista, a family-owned treasure perched atop Chicago\'s historic district. Our stunning rooftop terrace offers breathtaking skyline views, while our intimate interior dining room features rustic Italian charm with exposed stone walls and hand-painted murals from Tuscany. Three generations of the Rossini family bring you traditional recipes from Northern Italy. Our wedding packages include handmade pasta, wood-fired pizzas, and succulent meats from our rotisserie. The wine cellar houses over 200 Italian varietals. Accommodate up to 80 guests for a truly memorable Italian feast. Live accordion music available. Every detail speaks to Italian tradition and warmth. Our family treats your celebration as our own.',
    contact_email: 'info@bellavista.com',
    contact_phone: '(555) 456-7890',
    website: 'www.bellavistaitalia.com',
    address: '321 Vista Heights',
    city: 'Chicago',
    state: 'IL',
    price_range: '$$$',
    min_price: 75,
    max_price: 150,
    images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800', 'https://images.unsplash.com/photo-1515669097368-22e68427d265?w=800']
  },
  // Catering
  {
    name: 'Gourmet Affairs Catering',
    category: 'Catering',
    description: 'Elevate your wedding with Los Angeles\' most acclaimed catering company. With 25 years of experience and countless awards, Gourmet Affairs transforms venues into culinary destinations. Our executive chef team creates custom menus reflecting your unique style - from formal plated dinners to interactive food stations and elegant buffets. We specialize in fusion cuisine, blending international flavors with California fresh ingredients. Our signature presentations include live cooking stations, artisanal charcuterie displays, and dramatic dessert bars. Full-service packages include professional waitstaff in tuxedos, premium linens, fine china, crystal glassware, and polished flatware. Bartending services available with craft cocktails and premium spirits. Farm-to-table options, kosher, halal, and allergy-conscious menus available. Minimum 100 guests. Tasting sessions at our culinary studio.',
    contact_email: 'catering@gourmetaffairs.com',
    contact_phone: '(555) 567-8901',
    website: 'www.gourmetaffairs.com',
    address: '654 Culinary Court',
    city: 'Los Angeles',
    state: 'CA',
    price_range: '$$$',
    min_price: 50,
    max_price: 150,
    images: ['https://images.unsplash.com/photo-1555244162-803834f70033?w=800', 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=800', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800']
  },
  {
    name: 'Farm to Table Catering',
    category: 'Catering',
    description: 'Celebrate sustainably with Portland\'s premier farm-to-table catering service. We partner directly with local organic farms, ensuring the freshest seasonal ingredients for your wedding feast. Our menus change with the seasons, showcasing the Pacific Northwest\'s bounty. Spring features fresh asparagus and lamb, summer brings heirloom tomatoes and berries, fall delivers squash and mushrooms, winter highlights root vegetables and hearty grains. Our rustic-elegant presentation style uses wooden boards, mason jars, and natural elements. We compost all waste and use eco-friendly serviceware. Perfect for environmentally-conscious couples who value sustainability without compromising on taste or presentation. Dietary restrictions welcomed - we excel at vegan, vegetarian, and gluten-free options that even omnivores love.',
    contact_email: 'hello@farmtotable.com',
    contact_phone: '(555) 678-9012',
    website: 'www.farmtotablecatering.com',
    address: '987 Green Meadow Lane',
    city: 'Portland',
    state: 'OR',
    price_range: '$$',
    min_price: 40,
    max_price: 100,
    images: ['https://images.unsplash.com/photo-1478145787956-f6f12c59624d?w=800', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800']
  },
  // Host Services
  {
    name: 'Michael James - Professional MC',
    category: 'Host Services',
    description: 'Meet Michael James, Miami\'s most sought-after wedding MC and host with over 500 weddings under his belt. With infectious energy, professional polish, and a genuine love for celebrating love, Michael keeps your reception flowing seamlessly while reading the room perfectly. His services include ceremony coordination, grand entrance announcements, seamless transitions between events, interactive games and activities, and heartfelt toasts coordination. Fully bilingual in English and Spanish, Michael connects with diverse audiences and can switch languages mid-event. He arrives 2 hours early for venue walkthrough and stays until the last dance. Includes wireless microphone system and backup equipment. Michael\'s warm personality and quick wit ensure your guests are entertained without being overwhelmed. He works closely with your photographer, videographer, and DJ to capture every moment perfectly.',
    contact_email: 'michael@mjhostservices.com',
    contact_phone: '(555) 789-0123',
    website: 'www.michaeljamesmc.com',
    address: '147 Entertainment Blvd',
    city: 'Miami',
    state: 'FL',
    price_range: '$$',
    min_price: 800,
    max_price: 2000,
    images: ['https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800']
  },
  {
    name: 'Elite Event Hosts',
    category: 'Host Services',
    description: 'Elite Event Hosts brings Vegas-style professionalism to your wedding celebration. Our team of experienced hosts, DJs, and coordinators work in perfect harmony to create an unforgettable experience. Packages include ceremony officiation (ordained ministers on staff), professional MC services, day-of coordination, timeline management, vendor liaison services, and emergency kit. Our coordinators handle every detail from guest seating to cake cutting timing. We specialize in multicultural weddings and can accommodate multiple languages and traditions. Premium package includes uplighting design, monogram projection, and photo booth coordination. Each event is assigned a lead coordinator and assistant to ensure nothing is overlooked. We pride ourselves on making even the shyest guests feel comfortable on the dance floor.',
    contact_email: 'info@eliteeventhosts.com',
    contact_phone: '(555) 890-1234',
    website: 'www.eliteeventhosts.com',
    address: '258 Celebration Ave',
    city: 'Las Vegas',
    state: 'NV',
    price_range: '$$$',
    min_price: 1500,
    max_price: 5000,
    images: ['https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800']
  },
  // Venue Decorators
  {
    name: 'Enchanted Designs',
    category: 'Venue Decorators',
    description: 'Transform your venue into a breathtaking wonderland with Enchanted Designs, Austin\'s award-winning luxury decoration studio. Featured in Martha Stewart Weddings and The Knot, our design team creates immersive experiences that leave guests speechless. Full-service design includes custom floral installations, dramatic ceiling draping, specialty lighting design, lounge furniture vignettes, ceremony arch design, and hand-crafted centerpieces. We source exotic blooms from around the world and create show-stopping installations like flower walls, suspended floral chandeliers, and cascading greenery designs. Our lighting team uses intelligent fixtures to transform spaces with color-changing ambiance. Each wedding receives a dedicated lead designer, full setup and breakdown team, and on-site touch-ups throughout your event. Minimum investment $5,000. Consultations include mood boards, 3D renderings, and detailed proposals.',
    contact_email: 'design@enchanteddesigns.com',
    contact_phone: '(555) 901-2345',
    website: 'www.enchanteddesigns.com',
    address: '369 Design District',
    city: 'Austin',
    state: 'TX',
    price_range: '$$$$',
    min_price: 5000,
    max_price: 25000,
    images: ['https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800', 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800']
  },
  {
    name: 'Simply Beautiful Decorations',
    category: 'Venue Decorators',
    description: 'Elegant weddings don\'t have to break the bank. Simply Beautiful Decorations specializes in stunning designs that work with any budget. Our Denver-based team believes every couple deserves a beautiful wedding, and we make it happen through smart sourcing, DIY-friendly options, and efficient setup. Popular packages include romantic centerpieces with candles and greenery, ceremony backdrop with fabric draping and florals, sweetheart table design, guest book display area, and gift table styling. We offer rental inventory including vintage furniture, decorative signs, lanterns, vases, and linens. Our designers provide guidance for DIY projects and can execute them for you if preferred. Setup and breakdown services included. We work with your color scheme and vision to create cohesive designs. Perfect for couples who want their day to look expensive without the luxury price tag.',
    contact_email: 'info@simplybeautiful.com',
    contact_phone: '(555) 012-3456',
    website: 'www.simplybeautifuldecor.com',
    address: '741 Creative Way',
    city: 'Denver',
    state: 'CO',
    price_range: '$$',
    min_price: 1500,
    max_price: 5000,
    images: ['https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800', 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800']
  },
  // Photographers
  {
    name: 'Moments in Time Photography',
    category: 'Photographers',
    description: 'Capture your love story with Seattle\'s premier wedding photography studio. Our artistic, documentary-style approach focuses on authentic moments and genuine emotions rather than stiff, posed shots. Lead photographer Sarah Chen combines 15 years of experience with a fine arts background to create stunning images that feel both timeless and contemporary. All packages include complimentary engagement session (perfect for save-the-dates), full wedding day coverage from getting ready through send-off, second shooter for multiple angles, online gallery with download rights, printing rights with no watermarks, and personalized USB with all edited images. We deliver 500-800 edited photos in 6-8 weeks. Available for destination weddings. Our documentary style means we\'re practically invisible during your day, capturing candid laughter, happy tears, and spontaneous moments. Premium package includes rehearsal dinner coverage and next-day brunch session.',
    contact_email: 'bookings@momentsintime.com',
    contact_phone: '(555) 123-4560',
    website: 'www.momentsintimephoto.com',
    address: '852 Shutter Lane',
    city: 'Seattle',
    state: 'WA',
    price_range: '$$$',
    min_price: 2500,
    max_price: 6000,
    images: ['https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800']
  },
  {
    name: 'Classic Wedding Photography',
    category: 'Photographers',
    description: 'For over 20 years, Classic Wedding Photography has been Boston\'s trusted choice for traditional, elegant wedding photography. Owner and lead photographer Robert Williams trained under legendary portrait photographers and brings old-school professionalism to every wedding. Our approach combines timeless posed portraits with natural moment captures. Every family combination is photographed, ensuring you have formal portraits with parents, grandparents, and extended family. We provide a detailed shot list consultation and arrive early to scout the best locations. All packages include professionally retouched high-resolution images, color correction, blemish removal, and exposure adjustment for every photo. Digital files delivered on elegant custom USB. Albums available with leather binding and archival-quality printing. Perfect for couples who value tradition and want classic portraits they\'ll treasure for generations.',
    contact_email: 'info@classicweddings.com',
    contact_phone: '(555) 234-5601',
    website: 'www.classicweddingphoto.com',
    address: '963 Camera Court',
    city: 'Boston',
    state: 'MA',
    price_range: '$$',
    min_price: 1500,
    max_price: 4000,
    images: ['https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800']
  },
  // Transportation
  {
    name: 'Luxury Limousine Service',
    category: 'Transportation',
    description: 'Arrive in style with Phoenix\'s premier luxury transportation company. Our immaculate fleet includes stretch limousines, luxury sedans, vintage Rolls Royces, party buses, and exotic cars. Each vehicle is meticulously maintained, professionally detailed before every event, and equipped with premium sound systems, mood lighting, and climate control. Our professional chauffeurs wear tuxedos, arrive 15 minutes early, and are trained in wedding-day protocols. Red carpet service included with all packages. Popular wedding packages include bride transportation to ceremony, couple transportation to reception, and guest shuttle services. Champagne and bottled water complimentary. All vehicles feature privacy dividers and tinted windows. Our vintage 1962 Rolls Royce Silver Cloud is our most requested vehicle for classic elegance. Party buses accommodate up to 30 guests with dance floors and premium sound systems. Available for bachelor/bachelorette parties, rehearsal dinners, and day-after brunches.',
    contact_email: 'reservations@luxurylimo.com',
    contact_phone: '(555) 345-6012',
    website: 'www.luxurylimoservice.com',
    address: '159 Motor Parkway',
    city: 'Phoenix',
    state: 'AZ',
    price_range: '$$$',
    min_price: 500,
    max_price: 2000,
    images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800', 'https://images.unsplash.com/photo-1583474506652-e170835b2e99?w=800']
  },
  {
    name: 'Vintage Car Rentals',
    category: 'Transportation',
    description: 'Make a grand entrance in a stunning classic car from Charleston\'s finest vintage automobile collection. Our lovingly restored fleet includes a 1956 Rolls Royce Silver Wraith, 1965 Bentley S3, 1957 Chevrolet Bel Air, 1967 Ford Mustang convertible, and 1932 Packard sedan. Each vehicle is a showpiece, professionally restored to pristine condition with original details preserved. Perfect for photos and creating unforgettable memories. Our experienced drivers are classic car enthusiasts who treat each vehicle with reverence and ensure safe, smooth rides. Includes ribbon decoration in your wedding colors, "Just Married" signage if desired, and flexible timing for photo sessions at multiple locations. Most popular package includes transportation from getting-ready location to ceremony, posed photos at ceremony site, and transportation to reception. Hourly rentals available. These aren\'t just cars - they\'re rolling works of art that will make your wedding day truly special.',
    contact_email: 'book@vintagecarrentals.com',
    contact_phone: '(555) 456-7123',
    website: 'www.vintagecarrentals.com',
    address: '357 Classic Drive',
    city: 'Charleston',
    state: 'SC',
    price_range: '$$',
    min_price: 400,
    max_price: 1200,
    images: ['https://images.unsplash.com/photo-1552819401-700b5e342b9d?w=800', 'https://images.unsplash.com/photo-1583474506652-e170835b2e99?w=800']
  },
  // Pastry Chefs
  {
    name: 'Sweet Elegance Cakes',
    category: 'Pastry Chefs',
    description: 'Create the wedding cake of your dreams with Atlanta\'s most celebrated pastry studio. Award-winning cake designer Michelle Laurent combines French pastry techniques with artistic vision to create stunning edible masterpieces. Specializing in elegant tiered cakes adorned with intricate handmade sugar flowers, delicate fondant work, and modern geometric designs. Every cake is baked fresh using premium ingredients - real butter, Madagascar vanilla, Belgian chocolate, and fresh fruit purees. Popular flavors include champagne raspberry, salted caramel, Italian lemon cream, red velvet, and chocolate truffle. We accommodate all dietary needs with gluten-free, vegan, and sugar-free options that taste just as incredible. Complimentary tasting includes six flavor combinations with multiple filling options. Each consultation includes sketches and design boards. Delivery, setup, and cake stand rental included. We also create coordinating desserts: French macarons, cake pops, cupcake displays, and petit fours.',
    contact_email: 'orders@sweetelegance.com',
    contact_phone: '(555) 567-8234',
    website: 'www.sweetelegancecakes.com',
    address: '753 Bakery Boulevard',
    city: 'Atlanta',
    state: 'GA',
    price_range: '$$$',
    min_price: 500,
    max_price: 3000,
    images: ['https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800', 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800', 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800', 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800']
  },
  {
    name: 'Artisan Pastry Studio',
    category: 'Pastry Chefs',
    description: 'San Diego\'s boutique pastry studio brings European elegance to Southern California weddings. Trained at Le Cordon Bleu Paris, chef-owner Sophie Chen creates modern cakes that are as delicious as they are beautiful. Our signature style features naked cakes with fresh berries, minimalist buttercream designs, watercolor fondant, and metallic accents. We\'re known for unexpected flavor combinations: lavender honey, earl grey with lemon curd, bourbon salted caramel, and matcha white chocolate. Beyond cakes, we specialize in French dessert displays including colorful macaron towers (50+ flavor options), elegant croquembouche, individual plated desserts, and grazing tables with artisan chocolates and petit fours. Every creation is Instagram-worthy and unforgettably delicious. We offer flexible packages from simple cutting cakes paired with dessert displays to elaborate multi-tier showstoppers. Tastings held at our charming studio with coffee and tea service.',
    contact_email: 'hello@artisanpastry.com',
    contact_phone: '(555) 678-9345',
    website: 'www.artisanpastrystudio.com',
    address: '951 Confection Lane',
    city: 'San Diego',
    state: 'CA',
    price_range: '$$',
    min_price: 400,
    max_price: 2000,
    images: ['https://images.unsplash.com/photo-1588195538326-c5b1e5b80857?w=800', 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800', 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800']
  }
];

const sampleReviews = [
  {
    vendor_name: 'Grand Ballroom Estate',
    author_name: 'Sarah Johnson',
    rating: 5,
    title: 'Perfect Venue for Our Dream Wedding!',
    comment: 'The Grand Ballroom exceeded all our expectations. From our first walkthrough to our wedding day, the staff was incredibly helpful and professional. The space was absolutely stunning - the crystal chandeliers created the perfect romantic ambiance, and the grand staircase made for breathtaking photos. Our 250 guests fit comfortably, and everyone commented on how beautiful the venue was. The outdoor garden was perfect for our cocktail hour. The coordinator was amazing and helped everything run smoothly. Worth every penny!',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Grand Ballroom Estate',
    author_name: 'Michael Chen',
    rating: 5,
    title: 'Absolutely Magical Experience',
    comment: 'Our wedding at the Grand Ballroom was everything we dreamed of and more. The venue is even more beautiful in person than in photos. The bridal suite was spacious and had everything we needed. The valet service was seamless, and parking was never an issue. The sound system was perfect for our ceremony and reception. Our DJ said it was one of the best venues he\'s worked with. Can\'t recommend this place enough!',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Rustic Barn Venue',
    author_name: 'Emily Davis',
    rating: 5,
    title: 'Rustic Perfection',
    comment: 'If you want a rustic wedding, this is THE place. The barn is beautifully restored with so much character. The surrounding property is gorgeous with so many photo opportunities. We had our ceremony under the oak trees and it was magical. The getting-ready rooms were comfortable and well-appointed. The staff was helpful with setup and knew the property inside and out. Our guests loved the relaxed, countryside vibe. The farm tables and string lights created such a warm atmosphere.',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Rustic Barn Venue',
    author_name: 'James Rodriguez',
    rating: 5,
    title: 'Best Decision We Made',
    comment: 'We fell in love with this venue immediately. The combination of rustic charm and modern amenities was perfect. The climate control was essential for our July wedding. The property manager was fantastic and answered all our questions. Having the venue from morning to midnight gave us plenty of time for photos and decoration. The covered pavilion saved us when we had a brief rain shower. Absolutely beautiful venue!',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'La Maison French Bistro',
    author_name: 'Jessica Martinez',
    rating: 5,
    title: 'Exceptional Food and Service',
    comment: 'The food at La Maison was incredible! Our guests are still talking about the meal months later. Chef Pierre created a custom menu that perfectly reflected our taste. The Beef Bourguignon was melt-in-your-mouth tender, and the dessert course was divine. The wine pairings were excellent. The staff was professional, attentive, and made sure every detail was perfect. The private dining room was intimate and romantic. Perfect for our 100-guest wedding.',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Bella Vista Italian Restaurant',
    author_name: 'Anthony Caruso',
    rating: 5,
    title: 'Authentic Italian Experience',
    comment: 'As an Italian-American, I was skeptical about the authenticity, but Bella Vista blew me away. The Rossini family made us feel like part of their family. The handmade pasta was exactly like my grandmother used to make. The rooftop terrace provided stunning sunset views. The accordion player added such a special touch. Our 75 guests felt like we were dining in Italy. Incredible experience from start to finish!',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Gourmet Affairs Catering',
    author_name: 'David Thompson',
    rating: 4,
    title: 'High-Quality Catering Service',
    comment: 'Professional catering service with delicious, beautifully presented food. The setup was elegant with their premium linens and china. Our guests loved the interactive food stations. The staff was well-trained and courteous. The only minor issue was slight timing delays between courses during dinner service, but they recovered well. Overall a great experience and the food quality was outstanding. Would recommend for upscale weddings.',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Farm to Table Catering',
    author_name: 'Olivia Green',
    rating: 5,
    title: 'Sustainable and Delicious',
    comment: 'As vegans, we were thrilled to find Farm to Table. They created an entirely plant-based menu that even our meat-eating guests raved about. Everything was so fresh and flavorful. The seasonal vegetables were the star of the show. We loved knowing that our wedding supported local farmers and sustainable practices. The presentation was beautiful and rustic-elegant. The compostable serviceware aligned with our values. Highly recommend!',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Michael James - Professional MC',
    author_name: 'Amanda Wilson',
    rating: 5,
    title: 'Best MC Ever!',
    comment: 'Michael was absolutely amazing! He kept our reception fun, energetic, and flowing smoothly. He read the room perfectly and knew exactly when to pump up the energy and when to let moments breathe. Being bilingual was essential for our multicultural wedding - he seamlessly switched between English and Spanish. Our shy guests felt comfortable, and our party guests had a blast. He coordinated perfectly with our DJ and photographer. Booking Michael was one of the best decisions we made!',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Elite Event Hosts',
    author_name: 'Rebecca Chang',
    rating: 5,
    title: 'Flawless Coordination',
    comment: 'The Elite Event Hosts team was incredible from start to finish. Our coordinator handled every detail so seamlessly that we barely had to think about logistics on our wedding day. The officiant was warm and personal, the MC kept things moving, and the day-of coordinator was everywhere she needed to be. They even handled a last-minute vendor issue without us knowing until after. Worth every penny for the peace of mind. Professional and personable team!',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Enchanted Designs',
    author_name: 'Rachel Brown',
    rating: 5,
    title: 'Breathtakingly Beautiful',
    comment: 'Enchanted Designs transformed our venue into an absolute fairy tale. The suspended floral installations were like nothing I\'d ever seen - our guests gasped when they entered. The attention to detail was remarkable, from the custom centerpieces to the dramatic ceiling draping. The lighting design completely changed the ambiance throughout the night. Yes, it was an investment, but the photos and memories are priceless. Our designer understood our vision perfectly and elevated it beyond what we imagined.',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Simply Beautiful Decorations',
    author_name: 'Jennifer Martinez',
    rating: 5,
    title: 'Elegant on a Budget',
    comment: 'I was worried we couldn\'t afford beautiful decorations, but Simply Beautiful proved me wrong. They worked within our budget and created such elegant, cohesive designs. The greenery and candle centerpieces were simple but stunning. They helped us with some DIY projects and executed everything beautifully. The setup and breakdown were efficient and professional. Everyone thought we spent way more than we did! Perfect for couples who want elegance without the luxury price tag.',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Moments in Time Photography',
    author_name: 'Chris Anderson',
    rating: 5,
    title: 'Absolutely Stunning Photos',
    comment: 'Sarah and her team captured our day perfectly. The photos are artistic, emotional, and beautifully composed. We loved the documentary style - we barely noticed them during the day, but they captured every important moment. The engagement session was fun and helped us feel comfortable in front of the camera. We received over 700 edited photos, and it was hard to choose favorites because they were all gorgeous. Worth every penny. These photos will be treasured for generations.',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Classic Wedding Photography',
    author_name: 'Margaret Sullivan',
    rating: 5,
    title: 'Professional and Timeless',
    comment: 'Robert\'s traditional approach was exactly what we wanted. He made sure we had formal portraits with every family combination - something so important to us. His experience showed in how efficiently he worked through our shot list. The retouching was excellent, and everyone looked their best. The photos are classic and timeless, exactly what we hoped for. He was professional, punctual, and a calming presence on our wedding day. Highly recommend for couples who value tradition.',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Luxury Limousine Service',
    author_name: 'Nicole Taylor',
    rating: 5,
    title: 'Classy and Professional',
    comment: 'The vintage Rolls Royce was absolutely perfect for our classic wedding. The car was immaculate, and our chauffeur was punctual, professional, and even helped with my dress. The red carpet service made us feel like royalty. They provided champagne for our ride to the reception. The ride gave us a private moment together between ceremony and reception, which was so special. Excellent service from booking through the end of the night. Highly recommend!',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Vintage Car Rentals',
    author_name: 'Thomas Wright',
    rating: 5,
    title: 'Amazing Classic Cars',
    comment: 'The 1967 Mustang convertible was a dream come true for my car-loving bride. The car was in pristine condition and looked incredible in photos. Our driver was knowledgeable about the car and took great care of it. They were flexible with timing for our photo session and took us to multiple locations. The "Just Married" sign was a fun touch. Great value for such a special experience. Made our wedding day even more memorable!',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Sweet Elegance Cakes',
    author_name: 'Lauren Garcia',
    rating: 5,
    title: 'Stunning and Delicious',
    comment: 'Our cake was not only the most beautiful cake I\'ve ever seen, it was also the most delicious. Michelle\'s sugar flowers were works of art - guests thought they were real! The tasting session was fun and helped us find the perfect flavor combination. We chose champagne raspberry and every bite was heavenly. The delivery and setup were seamless. Worth every penny. Michelle is a true artist. Our cake was the centerpiece of our reception!',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Artisan Pastry Studio',
    author_name: 'Sophie Bennett',
    rating: 5,
    title: 'Creative and Delicious',
    comment: 'Sophie created the modern, unique cake we envisioned. The naked cake with fresh berries was gorgeous and so fresh-tasting. We also ordered a macaron tower with five different flavors - our guests loved them! The lavender honey flavor was incredible. The presentation was Instagram-worthy, and the taste exceeded expectations. Sophie was easy to work with and really understood our aesthetic. Great value for such high-quality pastries. Highly recommend!',
    would_recommend: true,
    approved: true
  },
  {
    vendor_name: 'Oceanview Terrace',
    author_name: 'Daniel Martinez',
    rating: 5,
    title: 'Breathtaking Ocean Views',
    comment: 'Getting married at sunset with the Pacific Ocean as our backdrop was absolutely magical. The glass pavilion is stunning, and having beach access for photos was amazing. Our guests loved the indoor-outdoor flow. The venue coordinator was excellent and anticipated our every need. The modern design was perfect for our contemporary wedding style. Expensive but worth it for such a unique, beautiful location. Our photos are incredible!',
    would_recommend: true,
    approved: true
  }
];

const seedDatabase = async () => {
  const client = await pool.connect();

  try {
    console.log('Starting database seeding...');

    // Get category IDs
    const categoryResult = await client.query('SELECT id, name FROM categories');
    const categories = {};
    categoryResult.rows.forEach(row => {
      categories[row.name] = row.id;
    });

    // Insert vendors
    for (const vendor of sampleVendors) {
      const categoryId = categories[vendor.category];

      await client.query(
        `INSERT INTO vendors (
          name, category_id, description, contact_email, contact_phone,
          website, address, city, state, price_range, min_price, max_price, images
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          vendor.name, categoryId, vendor.description, vendor.contact_email,
          vendor.contact_phone, vendor.website, vendor.address, vendor.city,
          vendor.state, vendor.price_range, vendor.min_price, vendor.max_price,
          vendor.images
        ]
      );
    }
    console.log('Sample vendors inserted');

    // Insert reviews
    for (const review of sampleReviews) {
      const vendorResult = await client.query(
        'SELECT id FROM vendors WHERE name = $1',
        [review.vendor_name]
      );

      if (vendorResult.rows.length > 0) {
        const vendorId = vendorResult.rows[0].id;

        await client.query(
          `INSERT INTO reviews (
            vendor_id, author_name, rating, title, comment, would_recommend, approved
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [vendorId, review.author_name, review.rating, review.title, review.comment, review.would_recommend, review.approved]
        );
      }
    }
    console.log('Sample reviews inserted');

    // Update vendor ratings and review counts
    await client.query(`
      UPDATE vendors v
      SET rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM reviews
        WHERE vendor_id = v.id AND approved = true
      ),
      review_count = (
        SELECT COUNT(*)
        FROM reviews
        WHERE vendor_id = v.id AND approved = true
      )
    `);
    console.log('Vendor ratings and review counts updated');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

seedDatabase();
