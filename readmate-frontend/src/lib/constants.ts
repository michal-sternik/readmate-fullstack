import { Book } from "../types/booktypes";

export const WEEKSPLIT = 14;
export const WEEKDURATION = 7;
export const API_BASE_URL = "http://localhost:3000/api";
export const MAX_RESULTS_PER_EXPLORE_PAGE = 9;
export const MAX_RESULTS_PER_USER_PAGE = 6;

export const mockBooks: Book[] = [
  {
    id: "asfdwe",
    title: "Wiosenne przebudzenie",
    startDate: new Date(2025, 3, 28),
    endDate: new Date(2025, 3, 30),
  },
  {
    id: "asdf",
    title: "Tajemnice Marca",
    startDate: new Date(2025, 3, 25),
    endDate: new Date(2025, 3, 28),
  },
  {
    id: "sdvcasd",
    title: "W poszukiwaniu słońca",
    startDate: new Date(2025, 3, 29),
    endDate: new Date(2025, 4, 2),
  },
  {
    id: "asfdwe",
    title: "Wiosenne przebudzenie2",
    startDate: new Date(2025, 3, 28),
    endDate: new Date(2025, 3, 30),
  },
  {
    id: "asdf",
    title: "Tajemnice Marca2",
    startDate: new Date(2025, 3, 25),
    endDate: new Date(2025, 3, 28),
  },
  {
    id: "sdvcasd",
    title: "W poszukiwaniu słońca2",
    startDate: new Date(2025, 3, 29),
    endDate: new Date(2025, 4, 2),
  },
  {
    id: "asfdwe",
    title: "Wiosenne przebudzenie3",
    startDate: new Date(2025, 3, 28),
    endDate: new Date(2025, 3, 30),
  },
  {
    id: "asdf",
    title: "Tajemnice Marca3",
    startDate: new Date(2025, 3, 25),
    endDate: new Date(2025, 3, 28),
  },
  {
    id: "sdvcasd",
    title: "W poszukiwaniu słońca3",
    startDate: new Date(2025, 3, 29),
    endDate: new Date(2025, 4, 2),
  },
];
export const exploreMockBooks = {
  kind: "books#volumes",
  totalItems: 1000000,
  items: [
    {
      kind: "books#volume",
      id: "dQHSTqR7ijUC",
      etag: "9+Gice/CSBU",
      selfLink: "https://www.googleapis.com/books/v1/volumes/dQHSTqR7ijUC",
      volumeInfo: {
        title: "Manufacturing Execution System - MES",
        authors: ["Jürgen Kletti, Testowy"],
        publisher: "Springer Science & Business Media",
        publishedDate: "2007-05-01",
        description:
          "The transformation of the classic factory from a production facility into a modern service center has resulted in management problems for which many companies are not yet prepared. The economic efficiency of modern value creation is not a property of the products but rather of the process. What this means is that the decisive potentials of companies are to be found not so much in their production capability but in their process capability. For manufacturers the requirement for process capability, which has in the meantime become the basis of the certification codes, gives rise in turn to the requirement that all value-adding processes be geared to the process result and thus to the customer. A necessary condition of process transp- ency is the ability to map the company's value stream in real time, without the acquisition process involving major outlay – a capability which is - yond the dominant ERP systems. Today modern manufacturing execution systems (MES) can offer re- time applications. They generate current and even historical maps for p- duction equipment and can thus be used as a basis for optimization pr- esses. As early as the beginning of the 1980s work started on methods of this kind which were then known as production data acquisition or - chine data collection. But while the main emphasis in the past was on achieving improvements in machine utilization, today the concern is p- dominantly to obtain real-time mapping of the value stream (supply chain).",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9783540497448",
          },
          {
            type: "ISBN_10",
            identifier: "3540497447",
          },
        ],
        readingModes: {
          text: true,
          image: true,
        },
        pageCount: 276,
        printType: "BOOK",
        categories: ["Business & Economics"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "0.3.4.0.preview.3",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=dQHSTqR7ijUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=dQHSTqR7ijUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.pl/books?id=dQHSTqR7ijUC&pg=PA100&dq=mes&hl=&cd=1&source=gbs_api",
        infoLink:
          "https://play.google.com/store/books/details?id=dQHSTqR7ijUC&source=gbs_api",
        canonicalVolumeLink:
          "https://play.google.com/store/books/details?id=dQHSTqR7ijUC",
      },
      saleInfo: {
        country: "PL",
        saleability: "FOR_SALE",
        isEbook: true,
        listPrice: {
          amount: 395.87,
          currencyCode: "PLN",
        },
        retailPrice: {
          amount: 277.11,
          currencyCode: "PLN",
        },
        buyLink:
          "https://play.google.com/store/books/details?id=dQHSTqR7ijUC&rdid=book-dQHSTqR7ijUC&rdot=1&source=gbs_api",
        offers: [
          {
            finskyOfferType: 1,
            listPrice: {
              amountInMicros: 395870000,
              currencyCode: "PLN",
            },
            retailPrice: {
              amountInMicros: 277110000,
              currencyCode: "PLN",
            },
          },
        ],
      },
      accessInfo: {
        country: "PL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.pl/books/download/Manufacturing_Execution_System_MES-sample-epub.acsm?id=dQHSTqR7ijUC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        pdf: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.pl/books/download/Manufacturing_Execution_System_MES-sample-pdf.acsm?id=dQHSTqR7ijUC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=dQHSTqR7ijUC&hl=&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... \u003Cb\u003EMES\u003C/b\u003E system which is to be taken seriously. Without complete coverage of all the user&#39;s require- ments under an ERP/PPS system the user will be purchasing precisely the problems he is actually trying to avoid. The standard software&nbsp;...",
      },
    },
    {
      kind: "books#volume",
      id: "pik30Yy6eEcC",
      etag: "5ZiXjFgl7OU",
      selfLink: "https://www.googleapis.com/books/v1/volumes/pik30Yy6eEcC",
      volumeInfo: {
        title: "MES Guide for Executives",
        subtitle:
          "Why and how to Select, Implement, and Maintain a Manufacturing Execution System",
        authors: ["Bianca Scholten"],
        publisher: "ISA",
        publishedDate: "2009",
        description:
          "Are you having trouble demonstrating to management what a manufacturing execution system (MES) is and what it can do for you? Suitable for CEOs, CFOs, and managers, this book sheds light on how to complete your plant's move into the twenty-first century.",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9781936007035",
          },
          {
            type: "ISBN_10",
            identifier: "1936007037",
          },
        ],
        readingModes: {
          text: true,
          image: true,
        },
        pageCount: 175,
        printType: "BOOK",
        categories: ["Business & Economics"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "0.2.3.0.preview.3",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=pik30Yy6eEcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=pik30Yy6eEcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.pl/books?id=pik30Yy6eEcC&pg=PA55&dq=mes&hl=&cd=2&source=gbs_api",
        infoLink:
          "http://books.google.pl/books?id=pik30Yy6eEcC&dq=mes&hl=&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/MES_Guide_for_Executives.html?hl=&id=pik30Yy6eEcC",
      },
      saleInfo: {
        country: "PL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "PL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.pl/books/download/MES_Guide_for_Executives-sample-epub.acsm?id=pik30Yy6eEcC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        pdf: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.pl/books/download/MES_Guide_for_Executives-sample-pdf.acsm?id=pik30Yy6eEcC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=pik30Yy6eEcC&hl=&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... \u003Cb\u003EMES\u003C/b\u003E projects carried out from September 2006 through September 2007. The charts speak for themselves. Figure 3.7 Company Size (Source: \u003Cb\u003EMES\u003C/b\u003E Experience Survey, Reinoud Visser, Atos Origin, presented during the MESA European Conference&nbsp;...",
      },
    },
    {
      kind: "books#volume",
      id: "oAoN2MO0pFYC",
      etag: "CfaaT+jwpuM",
      selfLink: "https://www.googleapis.com/books/v1/volumes/oAoN2MO0pFYC",
      volumeInfo: {
        title: "MES 23: Electrochemistry, Nanotechnology, and Biomaterials",
        publisher: "The Electrochemical Society",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9781566776851",
          },
          {
            type: "ISBN_10",
            identifier: "1566776856",
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 581,
        printType: "BOOK",
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "0.1.1.0.preview.1",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=oAoN2MO0pFYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=oAoN2MO0pFYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.pl/books?id=oAoN2MO0pFYC&pg=PR3&dq=mes&hl=&cd=3&source=gbs_api",
        infoLink:
          "http://books.google.pl/books?id=oAoN2MO0pFYC&dq=mes&hl=&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/MES_23_Electrochemistry_Nanotechnology_a.html?hl=&id=oAoN2MO0pFYC",
      },
      saleInfo: {
        country: "PL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "PL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.pl/books/download/MES_23_Electrochemistry_Nanotechnology_a-sample-pdf.acsm?id=oAoN2MO0pFYC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=oAoN2MO0pFYC&hl=&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... \u003Cb\u003EMES\u003C/b\u003E meeting, entitled “Electrochemistry, Nanotechnology and Biomaterials” which was revised by a scientific committee from \u003Cb\u003EMES\u003C/b\u003E. For each meeting, \u003Cb\u003EMES\u003C/b\u003E has published, in Spanish, a proceedings volume containing the full papers of all&nbsp;...",
      },
    },
    {
      kind: "books#volume",
      id: "Rrg7DwAAQBAJ",
      etag: "HNEysAIpqZA",
      selfLink: "https://www.googleapis.com/books/v1/volumes/Rrg7DwAAQBAJ",
      volumeInfo: {
        title: "MES Compendium",
        subtitle: "Perfect MES Solutions based on HYDRA",
        authors: ["Jürgen Kletti", "Rainer Deisenroth"],
        publisher: "Springer",
        publishedDate: "2017-10-28",
        description:
          "Manufacturing Execution System (MES) is the central part and data hub in a manufacturing environment, connecting ERP and shop floor through horizontal and vertical integration. As a perfect example of modern and Industry 4.0 orientated MES, HYDRA is described, basically modular structured with plenty of standard functions, covering all production areas and departments in a factory, such as machine connectivity, production management, production logistics, quality management, resource management, energy management, and HR. Collecting vast real-time production data is just the very first step, where many MES systems linger about. More important is to analyze and utilize mass production data, turning Big Data into Smart Data. MES Hydra offers various analysis tools and reports for the sake of efficiency and transparency.",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9783662549834",
          },
          {
            type: "ISBN_10",
            identifier: "3662549832",
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 249,
        printType: "BOOK",
        categories: ["Technology & Engineering"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "0.1.1.0.preview.1",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=Rrg7DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=Rrg7DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.pl/books?id=Rrg7DwAAQBAJ&pg=PA7&dq=mes&hl=&cd=4&source=gbs_api",
        infoLink:
          "https://play.google.com/store/books/details?id=Rrg7DwAAQBAJ&source=gbs_api",
        canonicalVolumeLink:
          "https://play.google.com/store/books/details?id=Rrg7DwAAQBAJ",
      },
      saleInfo: {
        country: "PL",
        saleability: "FOR_SALE",
        isEbook: true,
        listPrice: {
          amount: 351.88,
          currencyCode: "PLN",
        },
        retailPrice: {
          amount: 246.32,
          currencyCode: "PLN",
        },
        buyLink:
          "https://play.google.com/store/books/details?id=Rrg7DwAAQBAJ&rdid=book-Rrg7DwAAQBAJ&rdot=1&source=gbs_api",
        offers: [
          {
            finskyOfferType: 1,
            listPrice: {
              amountInMicros: 351880000,
              currencyCode: "PLN",
            },
            retailPrice: {
              amountInMicros: 246320000,
              currencyCode: "PLN",
            },
          },
        ],
      },
      accessInfo: {
        country: "PL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.pl/books/download/MES_Compendium-sample-pdf.acsm?id=Rrg7DwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=Rrg7DwAAQBAJ&hl=&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "Perfect \u003Cb\u003EMES\u003C/b\u003E Solutions based on HYDRA Jürgen Kletti, Rainer Deisenroth. Tasks have been added to the \u003Cb\u003EMES\u003C/b\u003E level which an \u003Cb\u003EMES\u003C/b\u003E system can perform within production management . The eight task areas of detailed planning and control&nbsp;...",
      },
    },
    {
      kind: "books#volume",
      id: "u7OiBAAAQBAJ",
      etag: "1pn87iCqupQ",
      selfLink: "https://www.googleapis.com/books/v1/volumes/u7OiBAAAQBAJ",
      volumeInfo: {
        title: "The Cardinal Cornerstone for MES Success",
        subtitle:
          "For Advanced Manufacturing Engineers and IT Professionals - The practical application of automation fundamentals for discrete manufacturing processes that produce low volume highly complex products",
        authors: ["Daniel B. Cardinal"],
        publisher: "AuthorHouse",
        publishedDate: "2014-06-17",
        description:
          "Technical Problem or Adaptive Challenge? Before a design organization develops a new computer system to support a manufacturing process, strategists need to understand what they are facing. Will their designers have to confront a series of technical problems or adaptive challenges? Technical problems have known solutions that most designers clearly understand. However, this means they will solve problems using existing organizational practices. An adaptive challenge means the organization will face problems that individually have many possible solutions. To find the correct set of solutions, the organization must experiment and adapt over time. Many design organizations ignore the fundamental differences between technical problems and adaptive challenges. As a result, engineering and IT planners mistakenly believe that they only need to hire specialists to solve technical problems. They expect these specialists to use the latest technologies and/or adopt some agile development process. These technology-focused designs or faith-based processes produce applications that have many undesirable anomalies, idiosyncrasies, and outliers. The information contained in this book enables strategists to stop adapting to challenges and start solving problems. The information defines and describes how low-level design fundamentals affect manufacturing processes and upper-level system designs. It specifically identifies the many technical problems designers will face, variable methods for solving them, and expected outcomes. This information enables an organization to adopt the best practices before starting a design. This sets up a knowledge-based development process where designers understand technical problems, adopt the correct set of fundamentals, and make the necessary improvements to machines and system designs.",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9781496916174",
          },
          {
            type: "ISBN_10",
            identifier: "1496916174",
          },
        ],
        readingModes: {
          text: true,
          image: true,
        },
        pageCount: 688,
        printType: "BOOK",
        categories: ["Education"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "2.4.2.0.preview.3",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=u7OiBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=u7OiBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.pl/books?id=u7OiBAAAQBAJ&pg=PA521&dq=mes&hl=&cd=5&source=gbs_api",
        infoLink:
          "https://play.google.com/store/books/details?id=u7OiBAAAQBAJ&source=gbs_api",
        canonicalVolumeLink:
          "https://play.google.com/store/books/details?id=u7OiBAAAQBAJ",
      },
      saleInfo: {
        country: "PL",
        saleability: "FOR_SALE",
        isEbook: true,
        listPrice: {
          amount: 194.42,
          currencyCode: "PLN",
        },
        retailPrice: {
          amount: 136.09,
          currencyCode: "PLN",
        },
        buyLink:
          "https://play.google.com/store/books/details?id=u7OiBAAAQBAJ&rdid=book-u7OiBAAAQBAJ&rdot=1&source=gbs_api",
        offers: [
          {
            finskyOfferType: 1,
            listPrice: {
              amountInMicros: 194420000,
              currencyCode: "PLN",
            },
            retailPrice: {
              amountInMicros: 136090000,
              currencyCode: "PLN",
            },
          },
        ],
      },
      accessInfo: {
        country: "PL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.pl/books/download/The_Cardinal_Cornerstone_for_MES_Success-sample-epub.acsm?id=u7OiBAAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        pdf: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.pl/books/download/The_Cardinal_Cornerstone_for_MES_Success-sample-pdf.acsm?id=u7OiBAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=u7OiBAAAQBAJ&hl=&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... \u003Cb\u003EMES\u003C/b\u003E . The advantages have to do with not requiring the \u003Cb\u003EMES\u003C/b\u003E to translate template information when controllers make requests . The disadvantages have to do with overcomplicating designs by creating more \u003Cb\u003EMES\u003C/b\u003E database variables and more&nbsp;...",
      },
    },
    {
      kind: "books#volume",
      id: "aTS9CQAAQBAJ",
      etag: "kY1cyy12am8",
      selfLink: "https://www.googleapis.com/books/v1/volumes/aTS9CQAAQBAJ",
      volumeInfo: {
        title: "MES: Multiple Entities Saga",
        authors: ["J. AnTony Fernandez"],
        publisher: "Lulu.com",
        publishedDate: "2015-04-08",
        description:
          "A student named Kane discovers something powerful within him. It is a spiritual element known as a Mes Core. However, finding this out comes with bad news. There are beings called Mes that are escaping his Core. They seek to free themselves from Kane, mainly by ending his life. Kane finds himself fighting for his life as he tries to regain control of his Core. With the help of his love interest, Kiy, he strives to protect not only himself, but all those that are around him. The struggle for freedom weighs heavy on his shoulders. Can Kane regain control of his Core, or will his Mes become whole, setting their plans to destroy everything in their path.",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9781329000841",
          },
          {
            type: "ISBN_10",
            identifier: "1329000846",
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 164,
        printType: "BOOK",
        categories: ["Fiction"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "0.3.2.0.preview.1",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=aTS9CQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=aTS9CQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.pl/books?id=aTS9CQAAQBAJ&pg=PA62&dq=mes&hl=&cd=6&source=gbs_api",
        infoLink:
          "http://books.google.pl/books?id=aTS9CQAAQBAJ&dq=mes&hl=&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/MES_Multiple_Entities_Saga.html?hl=&id=aTS9CQAAQBAJ",
      },
      saleInfo: {
        country: "PL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "PL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.pl/books/download/MES_Multiple_Entities_Saga-sample-pdf.acsm?id=aTS9CQAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=aTS9CQAAQBAJ&hl=&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... \u003Cb\u003EMes\u003C/b\u003E don&#39;t have a hunger to be freed. They are freed in three possible ways. The natural way is to wait for all the other \u003Cb\u003EMes\u003C/b\u003E to become free, and then their hunger to kill Kane will kick in, as they&#39;ll have advance into a normal \u003Cb\u003EMes\u003C/b\u003E. The&nbsp;...",
      },
    },
    {
      kind: "books#volume",
      id: "lYv5EAAAQBAJ",
      etag: "IsixI5UPp6c",
      selfLink: "https://www.googleapis.com/books/v1/volumes/lYv5EAAAQBAJ",
      volumeInfo: {
        title: "Mon stage infirmier en Gériatrie. Mes notes de stage IFSI",
        subtitle: "Je réussis mon stage !",
        authors: ["Mouna Mouna"],
        publisher: "Elsevier Health Sciences",
        publishedDate: "2024-02-27",
        description:
          "Fini le stress du premier jour de stage, cet ouvrage de fiches synthétiques vous propose toutes les connaissances indispensables pour intégrer les services de soin avec confiance et maîtriser les compétences à évaluer et les protocoles à respecter en fonction de chaque situation. Conçus par des Infirmier·es et médecins sur le terrain, chaque ouvrage se découpe en 6 parties : Connaître votre lieu de stage : Quelle famille de stage ? Comment est organisé le service ? Quels sont les grands services de cette spécialité en France ? Quels patients allez-vous rencontrer ? Quels professionnels allez-vous côtoyer ? Les compétences infirmières en lien avec les situations cliniques récurrentes et les prises en charge thérapeutiques ; Les prérequis en physiopathologie ; Les fiches pathologies déroulées selon un plan identique : définition, épidémiologie, étiologie, diagnostic, traitement et rubrique « conduite à tenir IDE » ; Les examens complémentaires les plus courants ; Tous les médicaments abordés dans l'ouvrage. En bonus Les fiches sont accompagnées de cartes mentales correspondant à la pathologie, vous permettant une mémorisation plus rapide grâce à la synthèse visuelle des informations importantes. Et enfin, les pages vierges « Mes notes de stage » en fin d'ouvrage vous offrent la possibilité de prendre vos propres notes. Cette collection vous accompagnera efficacement tout au long de votre stage. Au total, 15 spécialités sont proposées, couvrant la quasi-totalité des lieux de stage.",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9782294776694",
          },
          {
            type: "ISBN_10",
            identifier: "2294776690",
          },
        ],
        readingModes: {
          text: false,
          image: false,
        },
        pageCount: 297,
        printType: "BOOK",
        categories: ["Medical"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "0.0.1.0.preview.0",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=lYv5EAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=lYv5EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.pl/books?id=lYv5EAAAQBAJ&pg=PP3&dq=mes&hl=&cd=7&source=gbs_api",
        infoLink:
          "http://books.google.pl/books?id=lYv5EAAAQBAJ&dq=mes&hl=&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/Mon_stage_infirmier_en_G%C3%A9riatrie_Mes_no.html?hl=&id=lYv5EAAAQBAJ",
      },
      saleInfo: {
        country: "PL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "PL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=lYv5EAAAQBAJ&hl=&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... \u003Cb\u003EMES\u003C/b\u003E NOTES DE STAGE IFSI \u003Cb\u003EMES\u003C/b\u003E NOTES DE STAGE IFSI \u003Cb\u003EMES\u003C/b\u003E NOTES DE STAGE IFSI \u003Cb\u003EMES\u003C/b\u003E NOTES DE STAGE IFSI Vana Sos mon STAGE INFIRMIER Pédiatrie Pédopsychiatrie Descartes mentales Des pegs de notes Elsevier Mosson MON STAGE INFIRMIER Maladies&nbsp;...",
      },
    },
    {
      kind: "books#volume",
      id: "ftwzAQAAMAAJ",
      etag: "LUqfyWlIatw",
      selfLink: "https://www.googleapis.com/books/v1/volumes/ftwzAQAAMAAJ",
      volumeInfo: {
        title: "The Eagle",
        subtitle: "A Magazine Supported by Members of St. John's College",
        publishedDate: "1893",
        industryIdentifiers: [
          {
            type: "OTHER",
            identifier: "STANFORD:36105119128150",
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 790,
        printType: "BOOK",
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "0.4.6.0.full.1",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=ftwzAQAAMAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=ftwzAQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.pl/books?id=ftwzAQAAMAAJ&pg=PA594&dq=mes&hl=&cd=8&source=gbs_api",
        infoLink:
          "https://play.google.com/store/books/details?id=ftwzAQAAMAAJ&source=gbs_api",
        canonicalVolumeLink:
          "https://play.google.com/store/books/details?id=ftwzAQAAMAAJ",
      },
      saleInfo: {
        country: "PL",
        saleability: "FREE",
        isEbook: true,
        buyLink:
          "https://play.google.com/store/books/details?id=ftwzAQAAMAAJ&rdid=book-ftwzAQAAMAAJ&rdot=1&source=gbs_api",
      },
      accessInfo: {
        country: "PL",
        viewability: "ALL_PAGES",
        embeddable: true,
        publicDomain: true,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false,
          downloadLink:
            "http://books.google.pl/books/download/The_Eagle.epub?id=ftwzAQAAMAAJ&hl=&output=epub&source=gbs_api",
        },
        pdf: {
          isAvailable: true,
          downloadLink:
            "http://books.google.pl/books/download/The_Eagle.pdf?id=ftwzAQAAMAAJ&hl=&output=pdf&sig=ACfU3U1s_YL1eEtcpeGkMkrr4L-Zvw3GMw&source=gbs_api",
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=ftwzAQAAMAAJ&hl=&source=gbs_api",
        accessViewStatus: "FULL_PUBLIC_DOMAIN",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... \u003Cb\u003Emes\u003C/b\u003E . Le iour de la purificacion ij \u003Cb\u003Emes\u003C/b\u003E e pitance payn e crueyse . Le dimeygne prochein de vant les cendres ij \u003Cb\u003Emes\u003C/b\u003E elur crepis eflur . Le ior del anunciacion nre dame ij \u003Cb\u003Emes\u003C/b\u003E e pitance payn e crueyse . Le dimeygne de paumes , ij \u003Cb\u003Emes\u003C/b\u003E&nbsp;...",
      },
    },
    {
      kind: "books#volume",
      id: "VmEPAAAAYAAJ",
      etag: "17+d085VYpA",
      selfLink: "https://www.googleapis.com/books/v1/volumes/VmEPAAAAYAAJ",
      volumeInfo: {
        title: "A Dictionary of Medical Science ...",
        authors: ["Robley Dunglison"],
        publishedDate: "1893",
        industryIdentifiers: [
          {
            type: "OTHER",
            identifier: "HARVARD:HC18ER",
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 1240,
        printType: "BOOK",
        categories: ["Medicine"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "1.7.8.0.full.1",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=VmEPAAAAYAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=VmEPAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.pl/books?id=VmEPAAAAYAAJ&pg=PA691&dq=mes&hl=&cd=9&source=gbs_api",
        infoLink:
          "https://play.google.com/store/books/details?id=VmEPAAAAYAAJ&source=gbs_api",
        canonicalVolumeLink:
          "https://play.google.com/store/books/details?id=VmEPAAAAYAAJ",
      },
      saleInfo: {
        country: "PL",
        saleability: "FREE",
        isEbook: true,
        buyLink:
          "https://play.google.com/store/books/details?id=VmEPAAAAYAAJ&rdid=book-VmEPAAAAYAAJ&rdot=1&source=gbs_api",
      },
      accessInfo: {
        country: "PL",
        viewability: "ALL_PAGES",
        embeddable: true,
        publicDomain: true,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false,
          downloadLink:
            "http://books.google.pl/books/download/A_Dictionary_of_Medical_Science.epub?id=VmEPAAAAYAAJ&hl=&output=epub&source=gbs_api",
        },
        pdf: {
          isAvailable: true,
          downloadLink:
            "http://books.google.pl/books/download/A_Dictionary_of_Medical_Science.pdf?id=VmEPAAAAYAAJ&hl=&output=pdf&sig=ACfU3U3eck9ANGGnxgoaOcWbfIBy6p6ZAA&source=gbs_api",
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=VmEPAAAAYAAJ&hl=&source=gbs_api",
        accessViewStatus: "FULL_PUBLIC_DOMAIN",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "... \u003Cb\u003Emes\u003C/b\u003E - o - mer&#39;e - on . Perineum . Mesometritis , \u003Cb\u003Emes\u003C/b\u003E - o - met - re&#39;tis ( mesos , middle , metra , womb ) . Inflammation of the middle coat of the uterus . Mesomet&#39;rium . Vascular tissue associating the body of the uterus with&nbsp;...",
      },
    },
  ],
};
