import axios from 'axios'
import VideoSetPage from './VideoSetPage';
const videos = {}
const MovimientosSoc = [
  "Screenshot_5",
  "Screenshot_6",
  "Screenshot_7",
  "Screenshot_9",
  "Screenshot_12",
  "Screenshot_53",
  "Screenshot_55",
  "Screenshot_60",
  "Screenshot_61",
  "Screenshot_62",
  "Screenshot_64",
];
const MovimientosContra = [
  "Screenshot_4",
  "Screenshot_10",
  "Screenshot_16",
  "Screenshot_21",
  "Screenshot_23",
  "Screenshot_24",
  "Screenshot_25",
  "Screenshot_37",
  "Screenshot_38",
  "Screenshot_39",
  "Screenshot_40",
  "Screenshot_41",
  "Screenshot_52",
  "Screenshot_59",
  "Screenshot_65",
  "Screenshot_66",
];
const MovimientosUrbanos = [
  "Screenshot_1",
  "Screenshot_3",
  "Screenshot_8",
  "Screenshot_28",
  "Screenshot_29",
  "Screenshot_30",
  "Screenshot_31",
  "Screenshot_42",
  "Screenshot_48",
  "Screenshot_49",
  "Screenshot_67",
  "Screenshot_68",
  "Screenshot_69",
  "Screenshot_70",
  "Screenshot_71",
];
const MovimientosDefensa = [
  "Screenshot_2",
  "Screenshot_11",
  "Screenshot_33",
  "Screenshot_34",
  "Screenshot_43",
  "Screenshot_75",
  "Screenshot_76",
  "Screenshot_77",
  "Screenshot_79",
  "Screenshot_80",
  "Screenshot_81",
];
const ArteUrbano = [
  "Screenshot_26",
  "Screenshot_27",
  "Screenshot_32",
  "Screenshot_35",
  "Screenshot_36",
  "Screenshot_50",
  "Screenshot_51",
  "Screenshot_54",
  "Screenshot_56",
  "Screenshot_57",
  "Screenshot_58",
  "Screenshot_63",
];
const PueblosOriginarios = [
  "Screenshot_44",
  "Screenshot_45",
  "Screenshot_46",
  "Screenshot_47",
  "Screenshot_48",
  "Screenshot_72",
  "Screenshot_73",
  "Screenshot_74",
  "Screenshot_78",
];
const GeneracionTransparente = [
  "Screenshot_13",
  "Screenshot_14",
  "Screenshot_15",
  "Screenshot_17",
  "Screenshot_18",
  "Screenshot_19",
  "Screenshot_20",
  "Screenshot_22",
];



[
  ["Movimientos-Sociales", MovimientosSoc],
  ["Movimientos-Contraculturales", MovimientosContra],
  ["Memoria-Movimientos-Urbanos-y-Populares", MovimientosUrbanos],
  ["Movimientos-en-Defensa-del-Territorio", MovimientosDefensa],
  ["Arte-Urbano", ArteUrbano],
  ["Pueblos-Originarios-e-Indígenas", PueblosOriginarios],
  ["Generación-Transparente", GeneracionTransparente]
].forEach(([title, pic]) => {
  const picsArray = pic.reduce((acc, key) => {
    const name = key.replace(/^\.\/|\.png$/g, "").replace(/_/g, "-")
    return acc.concat({
      id: `${title}-${name}`,
      name,
      Video: `${"/images/Stills/Categories/"}${key}${".png"}`
    })
  }, [])
  // randomize the icons to show on the index page
  const highlightedVideos = picsArray
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .slice(0, 1)
  videos[title] = picsArray.map(
    obj =>
      highlightedVideos.includes(obj) ? { ...obj, highlighted: true } : obj
  )
})
export { videos };