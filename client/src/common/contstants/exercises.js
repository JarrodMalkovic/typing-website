const exercises = {
  letters: {
    name: 'Letters',
    slug: 'letters',
    img: '/images/Letters.png',
    subexercises: [
      { slug: 'basic-left-hand', name: 'Basic Left Hand' },
      { slug: 'basic-right-hand', name: 'Basic Right Hand' },
      { slug: 'left-and-right-handed', name: 'Left and Right Handed' },
      { slug: 'shift-left-hand', name: 'Shift Left Hand' },
      { slug: 'shift-right-hand', name: 'Shift Right Hand' },
      { slug: 'all-letters', name: 'All Letters' },
    ],
  },
  syllables: {
    name: 'Syllables',
    slug: 'syllables',
    img: '/images/Syllable.png',
    subexercises: [
      {
        slug: 'consonant-vowel',
        name: 'C + V',
      },
      {
        slug: 'shift-consonant-vowel',
        name: 'Shift C + V',
      },
      {
        slug: 'consonant-vowel-consonant',
        name: 'C + V + C',
      },
      {
        slug: 'shift-consonant-vowel-consonant',
        name: 'Shift C + V + C',
      },
      {
        slug: 'consonant-vowel-consonant-consonant',
        name: 'C + V + CC',
      },
    ],
  },
  words: {
    name: 'Words',
    slug: 'words',
    img: '/images/Words.png',
    subexercises: [
      {
        slug: 'two-syllables-without-ending-consonant',
        name: 'Two Syllables Without Ending Consonant',
      },
      {
        slug: 'three-syllables-without-ending-consonant',
        name: 'Three Syllables Without Ending Consonant',
      },
      {
        slug: 'two-syllables-with-ending-consonant',
        name: 'Two Syllables With Ending Consonant',
      },
      {
        slug: 'three-syllables-with-ending-consonant',
        name: 'Three Syllables With Ending Consonant',
      },
      {
        slug: 'longer-than-three-syllables',
        name: 'Longer Than Three Syllables',
      },
    ],
  },
  'short-sentences': {
    name: 'Short Sentences',
    slug: 'short-sentences',
    img: '/images/Short-Sentences.png',
    subexercises: [{ name: 'Short Sentences', slug: 'short-sentences' }],
  },
  'long-sentences': {
    name: 'Long Sentences',
    slug: 'long-sentences',
    img: '/images/Long-Sentences.png',
    subexercises: [{ name: 'Long Sentences', slug: 'long-sentences' }],
  },
  diction: {
    name: 'Diction',
    slug: 'diction',
    img: '/images/Dictation.png',
    subexercises: [
      { slug: 'word-diction', name: 'Word Diction' },
      { slug: 'short-sentence-diction', name: 'Short Sentence Diction' },
      { slug: 'long-sentence-diction', name: 'Long Sentence Diction' },
    ],
  },
};

export { exercises };
