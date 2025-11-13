class Octave {
    name: string;
    index: number;

    constructor(name: string, index: number) {
        this.name = name;
        this.index = index;
    }
}

class Note {
    name: string;
    index: number;
    octaveIndex: number;

    constructor(name: string, index: number, octaveIndex: number = 3) {
        this.name = name;
        this.index = index;
        this.octaveIndex = octaveIndex;
    }
}

const c = new Note("c", 0);
const csharp = new Note("c#", 1);
const d = new Note("d", 2)
const dsharp = new Note("d#", 3)
const e = new Note("e", 4)
const f = new Note("f", 5)
const fsharp = new Note("f#", 6)
const g = new Note("g", 7)
const gsharp = new Note("g#", 8)
const a = new Note("a", 9)
const asharp = new Note("a#", 10)
const b = new Note("b", 11)

const Notes = [c, csharp, d, dsharp, e, f, fsharp, g, gsharp, a, asharp, b]



class Interval {
    name: string;
    steps: number;

    constructor(name: string, steps: number) {
        this.name = name;
        this.steps = steps;
    }
}

const unison = new Interval("unison", 0)
const semitone = new Interval("minor second", 1)
const tone = new Interval("major second", 2)
const minorThird = new Interval("minor third", 3)
const majorThird = new Interval("major third", 4)
const perfectForth = new Interval("perfect fourth", 5)
const diminishedFith = new Interval("diminished fifth", 6)
const perfectFifth = new Interval("perfect fifth", 7)
const minorSixth = new Interval("minor sixth", 8)
const majorSixth = new Interval("major sixth", 9)
const minorSeventh = new Interval("minor seventh", 10)
const majorSeventh = new Interval("major seventh", 11)
const octave = new Interval("perfect octave", 12)



class Chord {
    name: string;
    intervals: Interval[];
}

class Scale {
    name: string;
    intervals: Interval[];

    constructor(name: string, intervals: Interval[]) {
        this.name = name;
        this.intervals = intervals;
    }
}

const major = new Scale("major", [tone, tone, semitone, tone, tone, tone, semitone])
const naturalMinor = new Scale("natural minor", [tone, semitone, tone, tone, semitone, tone, tone])
const ionian = new Scale("ionian", major.intervals)
const dorian = new Scale("dorian", [tone, semitone, tone, tone, tone, semitone, tone])
const phrygian = new Scale("phrygian", [semitone, tone, tone, tone, semitone, tone, tone])
const lydian = new Scale("lydian", [tone, tone, tone, semitone, tone, tone, semitone])
const myxolydian = new Scale("mixolydian", [tone, tone, semitone, tone, tone, semitone, tone])
const aeolian = new Scale("aeolian", naturalMinor.intervals)
const locrian = new Scale("locrian", [semitone, tone, tone, semitone, tone, tone, tone])
const phrygianDominant = new Scale("phrygian dominant", [semitone, minorThird, semitone, tone, semitone, tone, tone])
const symmetric = new Scale("symmetric", [semitone, tone, semitone, tone, semitone, tone, semitone, tone])

function nextNote(note: Note, interval: Interval): Note {
    var octaveIndex = note.octaveIndex
    var newIndex = note.index + interval.steps
    if (newIndex >= Notes.length) {
        newIndex = newIndex % 11;
        octaveIndex += 1;
    }
    var newNote = Notes[newIndex]
    newNote.octaveIndex = octaveIndex
    return newNote
}

function buildChord(root: Note, chord: Chord): Note[] {
    const notes: Note[] = [];
    notes.push(root);
    var thisNote = root;
    for (let interval of chord.intervals) {
        var nextNote = nextNote(thisNote, interval)
        notes.push(nextNote)
        thisNote = nextNote
    }

    return notes;
}