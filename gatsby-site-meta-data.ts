export default {
  /**
   * basic Information
   */
  title: `seongkyu.log`,
  description: `성규 블로그`,
  language: `ko`,
  siteUrl: `https://pangkyu.netlify.app/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder

  /**
   * comments setting
   */
  comments: {
    utterances: {
      repo: ``, //`danmin20/danmin-gatsby-blog`,
    },
  },

  /**
   * introduce yourself
   */
  author: {
    name: `배성규`,
    nickname: `pangkyu`,
    stack: ['Frontend', 'React', 'Typescript'],
    bio: {
      email: `qo1374@gmail.com`,
      residence: 'Ansan, South Korea',
      bachelorDegree: 'Hanshin Univ. Computer Engineering (2017.03-2023.02)',
    },
    social: {
      github: `https://github.com/pangkyu`,
      linkedIn: `https://www.linkedin.com/in/%EC%84%B1%EA%B7%9C-%EB%B0%B0-45800b269/`,
      resume: ``,
    },
    dropdown: {
      velog: 'https://velog.io/@pangkyu',
    },
  },

  /**
   * definition of featured posts
   */
  featured: [
    {
      title: 'category1',
      category: 'featured-category1',
    },
    // {
    //   title: 'category2',
    //   category: 'featured-category2',
    // },
  ],

  /**
   * metadata for About Page
   */
  timestamps: [
    {
      category: 'Career',
      date: '2024.05 - NOW',
      en: 'AIPro Corp.',
      kr: '(주)에이아이프로',
      info: 'Web Developer',
      link: 'https://www.aipro.ai/',
    },
    {
      category: 'Activity',
      date: '2023.07 - NOW',
      en: 'Community',
      kr: '커뮤니티',
      info: 'IT 커뮤니티',
      link: '',
    },
  ],

  /**
   * metadata for Playground Page
   */
  projects: [
    {
      title: 'Portfolio',
      description: '포트폴리오',
      techStack: ['React', 'Next.js', 'Typescript'],
      thumbnailUrl: '', // Path to your in the 'assets' folder
      links: {
        post: '',
        github: '',
        demo: '',
        googlePlay: '',
        appStore: '',
      },
    },
  ],

  /**
   * metadata for Buy Me A Coffee
   */
  remittances: {
    toss: {
      link: 'https://toss.me/danmin',
      qrCode: 'toss_qr.svg', // Path to your in the 'assets' folder
    },
    kakaopay: {
      qrCode: 'kakao_qr.svg', // Path to your in the 'assets' folder
    },
  },
};
