"use client";
import { useState } from "react";
import styles from "./VenuesSection.module.css";

type Venue = {
  name: string;
  location: string;
  url?: string;
  note?: string;
  price?: string;
};

const meetingRooms: Venue[] = [
  {
    name: "Коворкинг SOK",
    location: "Москва, Земляной вал, 8",
    url: "https://sok.works/ru/meetingrooms",
    note: "До 8–10 человек, кофе и вода включены",
    price: "~2 000 ₽/час",
  },
  {
    name: "Коворкинг-М1",
    location: "Москва, ул. Маршала Рыбалко, 2, к. 7",
    url: "https://co-marshal.ru/",
    note: "Утром и днём обычно свободно",
    price: "~2 000 ₽/час",
  },
  {
    name: "Коворкинг Флотилия",
    location: "Москва, Флотская, 7, к. 1, 29 этаж",
    note: "Вид на парк, 2 комнаты, нет посторонних. Собственник Татьяна: +7 903 781-43-14",
    price: "14 500 ₽/день",
  },
  {
    name: "Офис-лофт на Саввинской",
    location: "Москва, Саввинская наб., 19с1Б",
    url: "https://disk.360.yandex.ru/d/GYLH2QT-Ix4eTw",
    note: "До 10 человек, флипчарт, камера и монитор для зума",
    price: "15 000 ₽/день",
  },
  {
    name: "Plaza Garden (ЦМТ)",
    location: "Москва, Краснопресненская наб., 12",
    url: "https://plazagarden.ru/events/halls/private-lounge/",
    note: "Полное оборудование, чай/кофе. Контакт: Павел Казаневич, +7 985 444-01-94",
  },
  {
    name: "Swissotel Красные холмы",
    location: "Москва, Космодамианская наб., 52, стр. 6",
    url: "https://swissotelmoscow.ru/meetings-and-events/",
    note: "Переговорные разных размеров. Контакт: Дарья Кирикович, +7 901 533-47-44",
  },
  {
    name: "Casa Picassa",
    location: "Москва, Народная ул., 8 (м. Таганка)",
    url: "https://yandex.ru/maps/-/CCUaq4VeOA",
    note: "Несколько залов, 75\" плазма, микрофоны",
    price: "2 500–3 600 ₽/час",
  },
  {
    name: "Коворкинг Новь",
    location: "Москва, Комсомольская",
    url: "https://dcnov.ru/coworking/",
  },
  {
    name: "Know Where",
    location: "Москва, Садовническая наб., 9",
    url: "https://yandex.ru/maps/org/know_where/163659030685",
    note: "Рядом кафе для обеда",
  },
  {
    name: "Омега Плаза",
    location: "Москва, Ленинская слобода, 19",
    url: "https://sferadela.com/peregovorki/peregovornye-1169",
    price: "от 1 000 ₽/час",
  },
  {
    name: "Дели Плейс",
    location: "Москва, м. Белорусская",
    url: "https://delispace.ru/places/2862",
    price: "1 500 ₽/час",
  },
  {
    name: "Wizzard Digital",
    location: "Москва, м. Белорусская",
    url: "https://wizzard.digital/",
    price: "1 200 ₽/час",
  },
  {
    name: "Деловой центр Point2meet",
    location: "Москва, м. Охотный ряд",
    url: "https://point2meet.ru/locations/moskva",
  },
  {
    name: "СберПрайм",
    location: "Москва, разные адреса",
    note: "Бесплатно для членов клуба СберПрайм. Чай, кофе, вода включены",
  },
  {
    name: "Конференц-зал Novotel Resort",
    location: "Красная Поляна, Эсто-Садок, ул. Горная, 11",
    url: "https://gorky-otel.ru/konferenc_zaly/",
    note: "На высоте 960 м, до 10 человек",
    price: "~10 000 ₽/день",
  },
  {
    name: "Конференц-зал Green Flow",
    location: "Роза Хутор, Эсто-Садок, ул. Сулимовка, 9",
    url: "https://greenflow.ru/mice/",
    note: "Вид на горы, рядом открытый бассейн, до 10 человек",
    price: "~8–10 000 ₽/день",
  },
];

const restaurants: Venue[] = [
  {
    name: "Воронеж",
    location: "Москва, Пречистенка, 4",
    note: "Отдельная комната, завтраки с 8:00",
    price: "~30 000 ₽",
  },
  {
    name: "Чайхона XaLifLife",
    location: "Москва, 1-й Тверской-Ямской пер., 18",
    url: "https://restoran-halif.ru/halif-tverskaya",
    note: "VIP-комната на 8–10 человек, с 10:00",
  },
  {
    name: "Чайхона №1 на Пушкинской",
    location: "Москва, Пушкинская пл., 2/1",
    url: "https://chaihona.ru/restaurants/pushkinskaya-ploschad-2",
    note: "Кабинки на 8 чел. Скидка 25% по меню в будни до 17:00",
  },
  {
    name: "Чайхона №1 в Афимолл",
    location: "Москва Сити, Пресненская наб., 2",
    url: "https://chaihona.ru/restaurants/trc-afimoll-siti",
    note: "Отдельная комната на 8–10 человек, 5 этаж, с 10:00",
  },
  {
    name: "Гудман Прайм",
    location: "Москва, Охотный ряд, 2",
    url: "https://goodman-prime.ru/banquet",
    note: "Вид на Кремль. С 12:00. Предзаказ и предоплата обязательны",
  },
  {
    name: "Butler",
    location: "Москва, Трёхпрудный пер., 15",
    url: "https://butler.rest/banquets/",
    note: "Три кабинета — «Верона», «Флоренция», «Неаполь» — до 10 гостей. Депозит 40 000 ₽",
  },
  {
    name: "Harvey and Monika",
    location: "Москва, Котельническая наб., 31",
    url: "https://msk.harveyandmonica.ru/",
    note: "Переговорная на 10 человек, отдельно от зала",
  },
  {
    name: "Пекинская утка",
    location: "Москва, Цветной бульвар, 21, стр. 2",
    url: "https://jzpekingduck.ru/",
    note: "VIP-комнаты, утку с красивой подачей нужно заказывать заранее",
  },
  {
    name: "Ресторан Орда",
    location: "Москва, Мясницкая, 43, стр. 2",
    url: "https://orda-moscow.com/",
    note: "Закрытый зал на 10 человек",
    price: "1 000 ₽/час за комнату",
  },
  {
    name: "Чайхона Инжир",
    location: "Москва, Каланчевская, 33",
    note: "Большая отдельная комната 10+ человек с панорамными окнами",
  },
  {
    name: "Bocconcino",
    location: "Москва, Большой Патриарший пер., 4",
    url: "https://yandex.ru/maps/org/bocconcino/88560078247/",
    note: "Непроходная комната за шторкой. Депозит 30 000 ₽",
  },
  {
    name: "Look Up Cafe & Shop",
    location: "Москва, Садовническая ул., 9А",
    url: "https://yandex.ru/maps/org/look_up_cafe_shop/195701941358",
    note: "Отдельное помещение для форума",
    price: "депозит 2 500 ₽/чел",
  },
  {
    name: "Тануки",
    location: "Москва, Сущёвский вал, 31, стр. 1",
    url: "https://yandex.ru/maps/org/1224950425",
    note: "Отдельная комната, круглосуточно",
  },
  {
    name: "Мясо и Рыба",
    location: "Москва, ТРЦ Ривьера, Автозаводская, 18",
    url: "https://meat-and-fish.ru/ru/gallary/rivera",
    note: "Отдельная VIP-комната",
  },
  {
    name: "Генацвале на Арбате",
    location: "Москва, Новый Арбат, 11, стр. 2",
    note: "До 6 человек, без депозита и почасовой оплаты. Парковка строго с 12:00",
  },
  {
    name: "Me Sochi",
    location: "Адлер, ул. Мира, 183/4",
    url: "https://mesochi.rest",
    note: "3-й этаж автосалона Mercedes, вид на аэропорт, VIP-комната на 8–10 чел",
  },
];

const retreats: Venue[] = [
  {
    name: "Дача",
    location: "Солнечногорск, дер. Логиново, Набережный тупик, 9",
    url: "https://dacha-retreat.ru",
    note: "На берегу Истры. Уютные коттеджи, повар, красивая гостиная",
  },
  {
    name: "Усадьба Батюшково",
    location: "Дмитровский р-н, с. Батюшково, 89",
    url: "https://www.ecoclub-resort.ru/villa",
    note: "Демократичные цены, рядом река. Хозяин — предприниматель и профессор",
  },
  {
    name: "Веслево-клуб",
    location: "Переславль-Залесский, 120 км от Москвы",
    url: "https://veslevo.club/",
    note: "Владелец — Атлант Павел Васин. Коттеджи и барнхаусы у Плещеева озера. Бани, конюшня, ресторан",
  },
  {
    name: "Конаково",
    location: "Тверская область",
    url: "https://konakovo.com/",
    note: "Большие коттеджи по 4 спальни",
  },
  {
    name: "Конаково Ривер-клаб",
    location: "Тверская обл., г. Конаково, ул. Пригородная, 70",
    url: "https://konakovo.camp/retreat",
    note: "На Волге. Можно взять отдельный остров с домиками и ретрит-центром",
  },
  {
    name: "Клуб Lafa",
    location: "Домодедово, мкр. Востряково, ул. Чехова, 81",
    url: "https://lafaclub.ru/",
    note: "Домики в лесу за забором. Скидка 20% по кодовому слову «Атланты»",
  },
  {
    name: "Вилла Плес",
    location: "Плёс, Ивановская обл.",
    url: "https://villaplyos.ru/la-villa-plyos/corporate-retreats",
    note: "Переговорная на 20 человек или проживание",
  },
  {
    name: "Отель ПСБ Патриот",
    location: "Одинцовский р-н, парк «Патриот»",
    url: "https://psbpatriot.cosmosgroup.ru/",
    note: "Свежий отель, домики на 6 человек, СПА",
  },
  {
    name: "Изумрудный лес",
    location: "70 км от МКАД, Клинский р-н",
    url: "https://izumrudnyles.cosmosgroup.ru/ru/events/activities",
    note: "Переговорки, сервис, хорошая еда. Бронировать заранее. Цена высокая",
  },
  {
    name: "Ретрит-центр Яхмур",
    location: "70 км от Москвы, Орехово-Зуево",
    url: "https://www.yahmur-village.ru/",
    note: "«Потрясающий» — личная оценка",
  },
  {
    name: "Horseka",
    location: "45 км, Черноголовка, с. Ивановское",
    url: "https://horseka.ru/",
    note: "Проводили ретрит",
  },
  {
    name: "Сберуниверситет",
    location: "Истра, д. Аносино, ул. Университетская, вл. 11",
    url: "https://sberuniversity.ru/campus/",
  },
  {
    name: "Рэдиссон Завидово",
    location: "Тверская область",
    url: "https://www.radissonhotels.com/ru-ru/hotels/radisson-resort-zavidovo",
  },
  {
    name: "Лисья нора",
    location: "Дмитровский р-н, с. Игнатово",
    url: "https://www.foxlodge.ru/",
  },
  {
    name: "Велна Eco SPA",
    location: "Таруса, Серпуховское ш., 69",
    url: "https://welna.ru/",
  },
  {
    name: "АПИ Чехов",
    location: "Чеховский р-н, Стремиловский т/о",
    url: "https://chehov-api.ru/price",
  },
  {
    name: "Берта Вилладж",
    location: "Истра, дер. Ламишино",
    url: "https://bertavillage.ru/bathhouse",
  },
  {
    name: "Artiland",
    location: "Балашиха",
    url: "https://www.arti-land.ru/",
  },
  {
    name: "Барвиха",
    location: "Московская область",
    url: "https://www.barvikhahotel.com/",
  },
  {
    name: "Дача Винтера",
    location: "Карелия, Сортавала",
    url: "https://www.dachawintera.ru",
    note: "Ресторан, СПА, экотропы, парк Рускеала. Бронировать за 6 месяцев",
  },
  {
    name: "Ладожская усадьба",
    location: "Карелия, Сортавала",
    url: "https://ladoga-usadba.ru/",
    note: "Боулинг, бильярд, банный комплекс. Рускеала рядом. Бронировать за 6 месяцев",
  },
  {
    name: "Точка на карте",
    location: "Ленинградская обл., Приозерск",
    url: "https://tochkanakarte.ru/",
  },
  {
    name: "Юрьевское Подворье",
    location: "Великий Новгород, Юрьевское шоссе, 6А",
    url: "https://tk-podvorie.ru/",
  },
  {
    name: "Племя (Южный Урал)",
    location: "Миасс, оз. Ильменское",
    url: "https://plemya-park.ru",
    note: "Термальный парк-отель. Есть готовая программа ретрита",
  },
  {
    name: "Добрый Дом",
    location: "Сочи, Медовеевка",
    url: "https://dobryidom-sochi.ru",
    note: "Шале 495 м², 18+ человек. Баня, бассейн, мангал, повар. Связи почти нет",
  },
  {
    name: "Хиллс 1200",
    location: "Сочи, Медовеевка",
    url: "http://hills1200.ru",
    note: "Деревянные шале, эко-лоджи, банный комплекс с купелями",
  },
  {
    name: "Avan Marak (Севан)",
    location: "Армения, озеро Севан, дер. Тапатах",
    url: "https://tufenkianheritage.com/en/accommodation/avan-marak-tsapatagh-hotel",
    note: "Отель на берегу Севана",
  },
  {
    name: "Тундровый дом",
    location: "Мурманская обл., берег Баренцева моря",
    url: "https://tundrahouse.ru/contact-us/",
    note: "В 30 км севернее пос. Старая Титовка. Владелец — Андрей Личутин, +7 911 801-77-11",
  },
];

const tabs = [
  { id: "meeting", label: "Переговорки", data: meetingRooms },
  { id: "restaurants", label: "Рестораны", data: restaurants },
  { id: "retreats", label: "Загородные", data: retreats },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function VenuesSection() {
  const [active, setActive] = useState<TabId>("meeting");

  const current = tabs.find((t) => t.id === active)!;

  return (
    <div>
      <div className={styles.tabs}>
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`${styles.tab} ${active === t.id ? styles.tabActive : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ul className={styles.list}>
        {current.data.map((v) => (
          <li key={v.name} className={styles.item}>
            <div className={styles.itemHead}>
              {v.url ? (
                <a href={v.url} target="_blank" rel="noreferrer" className={styles.itemName}>
                  {v.name} →
                </a>
              ) : (
                <span className={styles.itemName}>{v.name}</span>
              )}
              {v.price && <span className={styles.itemPrice}>{v.price}</span>}
            </div>
            <div className={styles.itemLocation}>{v.location}</div>
            {v.note && <div className={styles.itemNote}>{v.note}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
