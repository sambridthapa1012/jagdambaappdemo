// Types removed - using implicit JavaScript types
import BarbedWire from '../assets/Barbed-Wire.jpeg';
import BindingWire from '../assets/Binding-Wire.jpeg';
import CheckerPlate from '../assets/Checker-Plate.jpeg';
import DeckingSheets from '../assets/Decking-Sheets.webp';
import Concertina from '../assets/Concertina-Wire.jpg';
import FiberSheet from '../assets/fiber-sheet.jpg';
import GateChannel from '../assets/Gate-Channel.jpeg';
import GIpipe from '../assets/GI-Pipe.webp';
import GIwire from '../assets/gi wire.jpeg';
import GlassWool from '../assets/glass-wool .webp';
import MsAngle from '../assets/ms-angle.jpeg';
import MSplate from '../assets/MS-Plates.jpg';
import MSround from '../assets/Ms-round pipe.webp';
import MSshutter from '../assets/MS-Shutter Spring.jpeg';
import MSwire from '../assets/ms-wire-mesh.jpg';
import OPC from '../assets/opc.webp';
import PPC from '../assets/ppc.jpeg';
import RoofingFiber from '../assets/roofing fiber_polycarbonate .webp';
import SideChannel from '../assets/Side-Channel.webp';
import SlottedAngle from '../assets/Slotted-Angle.jpeg';
import SquarePipe from '../assets/square-pipe.webp';
import SquareRod from '../assets/Square-Rod _ Plain Rod.avif';
import ssPipe from '../assets/ss-pipe.webp';
import ssRod from '../assets/SS-rod.webp';
import SteelAngle from '../assets/steel-angle.jpeg';
import Steel_Angle from '../assets/steel_angle.jpeg';
import UPVC_ridge from '../assets/upvc-ridge cover.jpeg';
import UPVC_titled_profile from '../assets/upvc-tiled-profile.webp';
import Welding_Rod from '../assets/Welding Rod.jpeg';
import paintscategory from '../assets/paintscategory.jpg';
import plumbingcategory from '../assets/plumbingcategory.webp';
import kitchenbathroomcategory from '../assets/kitchen&bathroomcategory.jpg';
import gardencategory from '../assets/gardencategory.jpg';
import toolscategory from '../assets/hardwarecategory.jpg';




export const categories = [
  {
    id: 'cement',
    name: 'Cement & Construction',
    nameNepali: 'सिमेन्ट र निर्माण',
    icon: '🏗️',
    image: 'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=500&h=300',
    subcategories: ['Portland Cement', 'Ready Mix Concrete', 'Mortar', 'Aggregates']
  },
  {
    id: 'paints',
    name: 'Paints & Colors',
    nameNepali: 'रंग र रंगरोगन',
    icon: '🎨',
    image: paintscategory,
    subcategories: ['Interior Paint', 'Exterior Paint', 'Primer', 'Wood Stain']
  },
  {
    id: 'tools',
    name: 'Tools & Hardware',
    nameNepali: 'औजार र हार्डवेयर',
    icon: '🔨',
    image: toolscategory,
    subcategories: ['Hand Tools', 'Power Tools', 'Measuring Tools', 'Safety Equipment']
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    nameNepali: 'पाईप र नल',
    icon: '🚿',
    image: plumbingcategory,
    subcategories: ['Pipes & Fittings', 'Faucets', 'Valves', 'Pumps']
  },
  {
    id: 'electrical',
    name: 'Electrical',
    nameNepali: 'बिजुलीका सामान',
    icon: '⚡',
    image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=500&h=300',
    subcategories: ['Wiring & Cables', 'Switches & Outlets', 'Lighting', 'Circuit Breakers']
  },
  {
    id: 'garden',
    name: 'Garden Supplies',
    nameNepali: 'बगैंचाका सामान',
    icon: '🌱',
    image: gardencategory,
    subcategories: ['Garden Tools', 'Fertilizers', 'Seeds', 'Planters']
  },
  {
    id: 'tiles',
    name: 'Tiles & Flooring',
    nameNepali: 'ट्याइल र फर्श',
    icon: '🏠',
    image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=500&h=300',
    subcategories: ['Ceramic Tiles', 'Marble', 'Laminate', 'Adhesives']
  },
  {
    id: 'bathroom',
    name: 'Bathroom & Kitchen',
    nameNepali: 'बाथरुम र भान्साकोठा',
    icon: '🚽',
    image: kitchenbathroomcategory,
    subcategories: ['Sanitaryware', 'Kitchen Sinks', 'Cabinets', 'Accessories']
  }
];

export const featuredProducts = [
 
    {
      id: '1',
      name: 'Barbed Wire',
      price: 120,
      image: BarbedWire,
      images: [BarbedWire],
      category: 'steel',
      brand: 'Jagadamba Steel',
      description: 'Galvanized barbed wire for fencing and security.',
      specifications: { Length: '50m', Coating: 'Zinc' },
      inStock: true,
      stockQuantity: 500,
      rating: 4.4,
      reviewCount: 40
    },
    {
      id: '2',
      name: 'Binding Wire',
      price: 95,
      image: BindingWire,
      images: [BindingWire],
      category: 'steel',
      brand: 'Jagadamba Steel',
      description: 'Soft binding wire for RCC construction.',
      specifications: { Diameter: '1mm', Weight: '1kg' },
      inStock: true,
      stockQuantity: 700,
      rating: 4.3,
      reviewCount: 35
    },
    {
      id: '3',
      name: 'Checker Plate',
      price: 6800,
      image: CheckerPlate,
      images: [CheckerPlate],
      category: 'steel',
      brand: 'JSW',
      description: 'Anti-slip steel plate for industrial flooring.',
      specifications: { Thickness: '3mm', Finish: 'Checkered' },
      inStock: true,
      stockQuantity: 120,
      rating: 4.6,
      reviewCount: 22
    },
    {
      id: '4',
      name: 'Decking Sheets',
      price: 2400,
      image: DeckingSheets,
      images: [DeckingSheets],
      category: 'roofing',
      brand: 'Tata Steel',
      description: 'Steel decking sheets for roofing and slabs.',
      specifications: { Thickness: '0.8mm' },
      inStock: true,
      stockQuantity: 300,
      rating: 4.5,
      reviewCount: 30
    },
    {
      id: '5',
      name: 'Concertina Wire',
      price: 3500,
      image: Concertina,
      images: [Concertina],
      category: 'security',
      brand: 'Defence Grade',
      description: 'High-security concertina wire fencing.',
      specifications: { Coil: '10m' },
      inStock: true,
      stockQuantity: 90,
      rating: 4.7,
      reviewCount: 18
    },
    {
      id: '6',
      name: 'Fiber Sheet',
      price: 1100,
      image: FiberSheet,
      images: [FiberSheet],
      category: 'roofing',
      brand: 'Nepal Fiber',
      description: 'Lightweight fiber roofing sheet.',
      specifications: { Thickness: '2mm' },
      inStock: true,
      stockQuantity: 250,
      rating: 4.2,
      reviewCount: 27
    },
    {
      id: '7',
      name: 'Gate Channel',
      price: 2100,
      image: GateChannel,
      images: [GateChannel],
      category: 'steel',
      brand: 'Jagadamba Steel',
      description: 'Steel channel for gates and frames.',
      specifications: { Length: '6m' },
      inStock: true,
      stockQuantity: 180,
      rating: 4.4,
      reviewCount: 21
    },
    {
      id: '8',
      name: 'GI Pipe',
      price: 1450,
      image: GIpipe,
      images: [GIpipe],
      category: 'plumbing',
      brand: 'Tata GI',
      description: 'Galvanized iron pipe for plumbing.',
      specifications: { Diameter: '1 inch', Length: '6m' },
      inStock: true,
      stockQuantity: 300,
      rating: 4.5,
      reviewCount: 32
    },
    {
      id: '9',
      name: 'GI Wire',
      price: 130,
      image: GIwire,
      images: [GIwire],
      category: 'steel',
      brand: 'JSW',
      description: 'Galvanized steel wire for construction.',
      specifications: { Diameter: '2mm' },
      inStock: true,
      stockQuantity: 600,
      rating: 4.3,
      reviewCount: 19
    },
    {
      id: '10',
      name: 'Glass Wool Insulation',
      price: 2800,
      image: GlassWool,
      images: [GlassWool],
      category: 'insulation',
      brand: 'UP Twiga',
      description: 'Thermal and acoustic insulation.',
      specifications: { Thickness: '50mm' },
      inStock: true,
      stockQuantity: 100,
      rating: 4.6,
      reviewCount: 14
    },
    {
      id: '11',
      name: 'MS Angle',
      price: 3200,
      image: MsAngle,
      images: [MsAngle],
      category: 'steel',
      brand: 'Jagadamba Steel',
      description: 'Mild steel angle for fabrication.',
      specifications: { Size: '40x40mm' },
      inStock: true,
      stockQuantity: 200,
      rating: 4.5,
      reviewCount: 25
    },
    {
      id: '12',
      name: 'MS Plate',
      price: 7200,
      image: MSplate,
      images: [MSplate],
      category: 'steel',
      brand: 'JSW',
      description: 'Heavy-duty MS steel plates.',
      specifications: { Thickness: '5mm' },
      inStock: true,
      stockQuantity: 90,
      rating: 4.6,
      reviewCount: 20
    },
    {
      id: '13',
      name: 'MS Round Pipe',
      price: 4100,
      image: MSround,
      images: [MSround],
      category: 'steel',
      brand: 'Jagadamba Steel',
      description: 'Round MS pipe for structural use.',
      specifications: { Diameter: '2 inch' },
      inStock: true,
      stockQuantity: 160,
      rating: 4.4,
      reviewCount: 23
    },
    {
      id: '14',
      name: 'MS Shutter Spring',
      price: 850,
      image: MSshutter,
      images: [MSshutter],
      category: 'hardware',
      brand: 'Precision',
      description: 'Rolling shutter spring.',
      specifications: { Size: 'Standard' },
      inStock: true,
      stockQuantity: 300,
      rating: 4.2,
      reviewCount: 15
    },
    {
      id: '15',
      name: 'MS Wire Mesh',
      price: 2200,
      image: MSwire,
      images: [MSwire],
      category: 'steel',
      brand: 'Jagadamba Steel',
      description: 'Wire mesh for reinforcement.',
      specifications: { Mesh: '12x12' },
      inStock: true,
      stockQuantity: 200,
      rating: 4.5,
      reviewCount: 19
    },
    {
      id: '16',
      name: 'OPC Cement',
      price: 1250,
      image: OPC,
      images: [OPC],
      category: 'cement',
      brand: 'Shivam Cement',
      description: 'OPC 53 grade cement.',
      specifications: { Weight: '50kg' },
      inStock: true,
      stockQuantity: 400,
      rating: 4.7,
      reviewCount: 60,
      isPopular: true
    },
    {
      id: '17',
      name: 'PPC Cement',
      price: 1180,
      image: PPC,
      images: [PPC],
      category: 'cement',
      brand: 'Shivam Cement',
      description: 'PPC cement for durable construction.',
      specifications: { Weight: '50kg' },
      inStock: true,
      stockQuantity: 380,
      rating: 4.6,
      reviewCount: 52
    },
    {
      id: '18',
      name: 'Polycarbonate Roofing Sheet',
      price: 1900,
      image: RoofingFiber,
      images: [RoofingFiber],
      category: 'roofing',
      brand: 'Sunlite',
      description: 'UV-protected roofing sheet.',
      specifications: { Thickness: '3mm' },
      inStock: true,
      stockQuantity: 220,
      rating: 4.5,
      reviewCount: 28
    },
    {
      id: '19',
      name: 'Side Channel',
      price: 1850,
      image: SideChannel,
      images: [SideChannel],
      category: 'steel',
      brand: 'Jagadamba Steel',
      description: 'Steel side channel for structures.',
      specifications: { Length: '6m' },
      inStock: true,
      stockQuantity: 140,
      rating: 4.4,
      reviewCount: 17
    },
    {
      id: '20',
      name: 'Slotted Angle',
      price: 1600,
      image: SlottedAngle,
      images: [SlottedAngle],
      category: 'steel',
      brand: 'Precision',
      description: 'Slotted angle for racks and shelving.',
      specifications: { Length: '6ft' },
      inStock: true,
      stockQuantity: 210,
      rating: 4.5,
      reviewCount: 20
    },
    {
      id: '21',
      name: 'Square Pipe',
      price: 3900,
      image: SquarePipe,
      images: [SquarePipe],
      category: 'steel',
      brand: 'Jagadamba Steel',
      description: 'Square MS pipe for fabrication.',
      specifications: { Size: '40x40mm' },
      inStock: true,
      stockQuantity: 170,
      rating: 4.6,
      reviewCount: 26
    },
    {
      id: '22',
      name: 'Square Rod',
      price: 3400,
      image: SquareRod,
      images: [SquareRod],
      category: 'steel',
      brand: 'JSW',
      description: 'Square steel rod.',
      specifications: { Size: '20mm' },
      inStock: true,
      stockQuantity: 190,
      rating: 4.4,
      reviewCount: 18
    },
    {
      id: '23',
      name: 'SS Pipe',
      price: 5200,
      image: ssPipe,
      images: [ssPipe],
      category: 'steel',
      brand: 'Jindal',
      description: 'Stainless steel pipe.',
      specifications: { Grade: '304' },
      inStock: true,
      stockQuantity: 130,
      rating: 4.7,
      reviewCount: 29
    },
    {
      id: '24',
      name: 'SS Rod',
      price: 5600,
      image: ssRod,
      images: [ssRod],
      category: 'steel',
      brand: 'Jindal',
      description: 'Stainless steel rod.',
      specifications: { Grade: '304' },
      inStock: true,
      stockQuantity: 110,
      rating: 4.6,
      reviewCount: 21
    },
    {
      id: '25',
      name: 'Steel Angle',
      price: 3000,
      image: SteelAngle,
      images: [SteelAngle],
      category: 'steel',
      brand: 'Jagadamba Steel',
      description: 'Heavy-duty steel angle.',
      specifications: { Size: '50x50mm' },
      inStock: true,
      stockQuantity: 180,
      rating: 4.5,
      reviewCount: 23
    },
    {
      id: '26',
      name: 'Steel Angle Premium',
      price: 3200,
      image: Steel_Angle,
      images: [Steel_Angle],
      category: 'steel',
      brand: 'JSW',
      description: 'Premium quality steel angle.',
      specifications: { Size: '65x65mm' },
      inStock: true,
      stockQuantity: 140,
      rating: 4.6,
      reviewCount: 19
    },
    {
      id: '27',
      name: 'UPVC Ridge Cover',
      price: 950,
      image: UPVC_ridge,
      images: [UPVC_ridge],
      category: 'roofing',
      brand: 'UPVC Nepal',
      description: 'UPVC ridge cover for roofing.',
      specifications: { Length: '1m' },
      inStock: true,
      stockQuantity: 140,
      rating: 4.4,
      reviewCount: 16
    },
    {
      id: '28',
      name: 'UPVC Tilted Profile',
      price: 1300,
      image: UPVC_titled_profile,
      images: [UPVC_titled_profile],
      category: 'roofing',
      brand: 'UPVC Nepal',
      description: 'UPVC tilted roofing profile.',
      specifications: { Thickness: '2.5mm' },
      inStock: true,
      stockQuantity: 160,
      rating: 4.5,
      reviewCount: 14
    },
    {
      id: '29',
      name: 'Welding Rod',
      price: 750,
      image: Welding_Rod,
      images: [Welding_Rod],
      category: 'tools',
      brand: 'ADOR',
      description: 'High-quality welding electrodes.',
      specifications: { Size: '3.15mm', Weight: '5kg' },
      inStock: true,
      stockQuantity: 500,
      rating: 4.8,
      reviewCount: 70,
      isPopular: true
    }

  
];

export const allProducts = [
  ...featuredProducts,
  // Additional products would be added here in a real application
];

