class Octave {
    name: string;
    index: number;

    constructor(name: string, index: number) {
        this.name = name;
        this.index = index;
    }
}

export class Note {
    name: string;
    index: number;
    octaveIndex: number;

    static readonly C = new Note("c", 0);
    static readonly CSHARP = new Note("c#", 1);
    static readonly D = new Note("d", 2);
    static readonly DSHARP = new Note("d#", 3);
    static readonly E = new Note("e", 4);
    static readonly F = new Note("f", 5);
    static readonly FSHARP = new Note("f#", 6);
    static readonly G = new Note("g", 7);
    static readonly GSHARP = new Note("g#", 8);
    static readonly A = new Note("a", 9);
    static readonly ASHARP = new Note("a#", 10);
    static readonly B = new Note("b", 11);
    static readonly Notes = [
        Note.C,
        Note.CSHARP,
        Note.D,
        Note.DSHARP,
        Note.E,
        Note.F,
        Note.FSHARP,
        Note.G,
        Note.GSHARP,
        Note.A,
        Note.ASHARP,
        Note.B
    ];

    constructor(name: string, index: number, octaveIndex: number = 3) {
        this.name = name;
        this.index = index;
        this.octaveIndex = octaveIndex;
    }
}

export class Interval {
    name: string;
    steps: number;

    static readonly PerfectUnison = new Interval("perfect unison", 0);
    static readonly MinorSecond = new Interval("minor second", 1);
    static readonly MajorSecond = new Interval("major second", 2);
    static readonly MinorThird = new Interval("minor third", 3);
    static readonly MajorThird = new Interval("major third", 4);
    static readonly PerfectFourth = new Interval("perfect fourth", 5);
    static readonly DiminishedFifth = new Interval("diminished fifth", 6);
    static readonly PerfectFifth = new Interval("perfect fifth", 7);
    static readonly MinorSixth = new Interval("minor sixth", 8);
    static readonly MajorSixth = new Interval("major sixth", 9);
    static readonly MinorSeventh = new Interval("minor seventh", 10);
    static readonly MajorSeventh = new Interval("major seventh", 11);
    static readonly PerfectOctave = new Interval("perfect octave", 12);

    constructor(name: string, steps: number) {
        this.name = name;
        this.steps = steps;
    }
}

class Chord {
    name: string;
    intervals: Interval[];
}

export class Scale {
    name: string;
    intervals: Interval[];

    static readonly Major = new Scale("major", [Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond]);
    static readonly NaturalMinor = new Scale("natural minor", [Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond]);
    static readonly Ionian = Scale.Major;
    static readonly Dorian = new Scale("dorian", [Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond]);
    static readonly Phrygian = new Scale("phrygian", [Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond]);
    static readonly Lydian = new Scale("lydian", [Interval.MajorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond]);
    static readonly Myxolydian = new Scale("mixolydian", [Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond]);
    static readonly Aeolian = Scale.NaturalMinor;
    static readonly Locrian = new Scale("locrian", [Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MajorSecond]);
    static readonly PhrygianDominant = new Scale("phrygian dominant", [Interval.MinorSecond, Interval.MinorThird, Interval.MinorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond]);
    static readonly Symmetric = new Scale("symmetric", [Interval.MinorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond]);
    static readonly Scales = [
        Scale.Major,
        Scale.NaturalMinor,
        Scale.Dorian,
        Scale.Phrygian,
        Scale.Lydian,
        Scale.Myxolydian,
        Scale.Aeolian,
        Scale.Locrian,
        Scale.PhrygianDominant,
        Scale.Symmetric
    ];

    constructor(name: string, intervals: Interval[]) {
        this.name = name;
        this.intervals = intervals;
    }
}

function selectNextNote(note: Note, interval: Interval): Note {
    var octaveIndex = note.octaveIndex
    var newIndex = note.index + interval.steps
    if (newIndex >= Note.Notes.length) {
        newIndex = newIndex % Note.Notes.length;
        octaveIndex += 1;
    }
    const proto = Note.Notes[newIndex];
    const newNote = new Note(proto.name, proto.index, octaveIndex);
    return newNote
}

function buildChord(root: Note, chord: Chord): Note[] {
    const notes: Note[] = [];
    notes.push(root);
    var thisNote = root;
    for (let interval of chord.intervals) {
        var nextNote = selectNextNote(thisNote, interval)
        notes.push(nextNote)
        thisNote = nextNote
    }

    return notes;
}

export function buildScale(root: Note, scale: Scale): Note[] {
    const notes: Note[] = [];
    notes.push(root);
    var thisNote = root;
    var octaveIndex = root.octaveIndex
    for (let interval of scale.intervals) {
        var nextNote = selectNextNote(thisNote, interval)
        notes.push(nextNote)
        thisNote = nextNote
    }

    return notes;
}
