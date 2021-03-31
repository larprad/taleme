export default {
  onGoing: true,
  defaultStoryImage: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  loading: true,
  storyLoaded: false,
  storyNotFound: false,
  storiesList: [
    {
      id: 1,
      title: 'test 1',
      summary: 'résumé test 1',
      image: 'https://images.pexels.com/photos/3663060/pexels-photo-3663060.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      status: 3,
      rating: null,
      slug: 'test-1',
      theme: [
        {
          id: 1,
          name: 'Science-Fiction',
        },
        {
          id: 2,
          name: 'Fantasy',
        },
      ],
      duration: {
        id: 1,
        length: 'court',
      },
      user: {
        id: 1,
        pseudo: 'user',
      },
    },
    {
      id: 2,
      title: 'test 2',
      summary: 'résumé test 2',
      image: 'https://images.pexels.com/photos/2564846/pexels-photo-2564846.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      status: 3,
      rating: null,
      slug: 'test-2',
      theme: [
        {
          id: 1,
          name: 'Science-Fiction',
        },
        {
          id: 3,
          name: 'Policier',
        },
      ],
      duration: {
        id: 3,
        length: 'long',
      },
      user: {
        id: 1,
        pseudo: 'user',
      },
    },
  ],
  currentStory: {
    storyInformations: {
      id: 1,
      title: 'Des gros réptiles pas commodes',
      summary: `Ne pas réveiller le chat qui dort, c'est ce que le milliardaire John Hammond aurait dû se rappeler avant de se lancer dans le clonage de dinosaures. C'est à partir d'une goutte de sang absorbée par un moustique fossilisé que John Hammond et son équipe ont réussi à faire renaître une dizaine d'espèces de dinosaures.
      `,
      image: '',
      status: 3,
      rating: null,
      slug: 'test-1',
      theme: [
        {
          id: 1,
          name: 'Science-Fiction',
        },
        {
          id: 2,
          name: 'Fantasy',
        },
      ],
      duration: {
        id: 1,
        length: 'court',
      },
      user: {
        id: 1,
        pseudo: 'Jean Michou',
      },
    },
    blocks: [
      {
        id: 1,
        title: 'Block 1',
        text: 'Ceci est le block un Bienvenidos dans cette histoire, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non',
        image: '',
        prevChoiceId: 3,
        type: 1,
        idChoices: [
          1, 2,
        ],
      },
      {
        id: 2,
        title: 'Block 2',
        text: 'Ceci et le block deux menant au block 3 et 4, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non',
        image: '',
        type: 2,
        idChoices: [
          2,
          3,
          4,
        ],
      },
      {
        id: 3,
        title: 'Block 3',
        text: "BRAVO ! Tu as gagné l'aventure en choisissant le block 3",
        image: 'https://images.pexels.com/photos/40815/youth-active-jump-happy-40815.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        type: 2,
        idChoices: [],
      },
      {
        id: 4,
        title: 'Block 4',
        text: "Tu as PERDU ! il va falloir s'accrocher mais ne choisit plus le block 4",
        image: 'https://images.pexels.com/photos/1270184/pexels-photo-1270184.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        type: 2,
        idChoices: [],
      },
    ],
    choices: [
      {
        id: 1,
        text: "Coucou je suis le premier \"choix\" qui t'emmene au block 2",
        idBlocks: {
          belongToBlock: 1,
          leadsToBlock: 2,
        },
      },
      {
        id: 2,
        text: 'Coucou je suis le choix qui mène au block 3',
        idBlocks: {
          belongToBlock: 2,
          leadsToBlock: 3,
        },
      },
      {
        id: 3,
        text: 'Coucou je suis le choix qui mène au block 4',
        idBlocks: {
          belongToBlock: 2,
          leadsToBlock: 4,
        },
      },
      {
        id: 4,
        text: 'Coucou je suis un autre choix qui mène au block 4',
        idBlocks: {
          belongToBlock: 2,
          leadsToBlock: 4,
        },
      },
    ],
  },
  currentBlock: {
    id: '',
    title: '',
    text: '',
    image: '',
    type: '',
    idChoices: [
    ],
  },
};
