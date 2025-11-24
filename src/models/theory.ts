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

    static readonly C = new Note("C", 0);
    static readonly CSHARP = new Note("C#", 1);
    static readonly D = new Note("D", 2);
    static readonly DSHARP = new Note("D#", 3);
    static readonly E = new Note("E", 4);
    static readonly F = new Note("F", 5);
    static readonly FSHARP = new Note("F#", 6);
    static readonly G = new Note("G", 7);
    static readonly GSHARP = new Note("G#", 8);
    static readonly A = new Note("A", 9);
    static readonly ASHARP = new Note("A#", 10);
    static readonly B = new Note("B", 11);
    static readonly Notes = [
        Note.C, Note.CSHARP, Note.D, Note.DSHARP,
        Note.E, Note.F, Note.FSHARP, Note.G,
        Note.GSHARP, Note.A, Note.ASHARP, Note.B
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
    static readonly Intervals = [
        Interval.PerfectUnison, Interval.MinorSecond, Interval.MajorSecond, Interval.MinorThird,
        Interval.MajorThird, Interval.PerfectFourth, Interval.DiminishedFifth, Interval.PerfectFifth,
        Interval.MinorSixth, Interval.MajorSixth, Interval.MinorSeventh, Interval.MajorSeventh,
        Interval.PerfectOctave
    ];

    constructor(name: string, steps: number) {
        this.name = name;
        this.steps = steps;
    }
}

class Chord {
    classification: string;
    intervals: Interval[];
    notes: Note[];

    static readonly MajorTriad = new Chord("major", [Interval.MajorThird, Interval.MinorThird]);
    static readonly MinorTriad = new Chord("minor", [Interval.MinorThird, Interval.MajorThird]);
    static readonly DiminishedTriad = new Chord("diminished", [Interval.MinorThird, Interval.MinorThird]);
    static readonly AugmentedTriad = new Chord("augmented", [Interval.MajorThird, Interval.MajorThird]);
    static readonly SuspendedFourth = new Chord("suspended fourth", [Interval.PerfectFourth, Interval.MajorSecond]);
    static readonly SuspendedSecond = new Chord("suspended second", [Interval.MajorSecond, Interval.PerfectFourth]);
    static readonly Chords = [
        Chord.MajorTriad,
        Chord.MinorTriad,
        Chord.DiminishedTriad,
        Chord.AugmentedTriad,
        Chord.SuspendedFourth,
        Chord.SuspendedSecond
    ];

    constructor(classification: string, intervals: Interval[]) {
        this.classification = classification;
        this.intervals = intervals;
    }

    get name(): string {
        const name = (this.notes[0] !== null) ? this.notes[0].name + " " + this.classification : this.classification;
        return name;
    }
}

export class Scale {
    name: string;
    intervals: Interval[];

    static readonly Major = new Scale("major", [Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond]);
    static readonly NaturalMinor = new Scale("natural minor", [Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond]);
    static readonly Ionian = new Scale("ionian", Scale.Major.intervals);
    static readonly Dorian = new Scale("dorian", [Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond]);
    static readonly Phrygian = new Scale("phrygian", [Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond]);
    static readonly Lydian = new Scale("lydian", [Interval.MajorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond]);
    static readonly Myxolydian = new Scale("mixolydian", [Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond]);
    static readonly Aeolian = new Scale("aeolian", Scale.NaturalMinor.intervals);
    static readonly Locrian = new Scale("locrian", [Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond, Interval.MajorSecond]);
    static readonly PhrygianDominant = new Scale("phrygian dominant", [Interval.MinorSecond, Interval.MinorThird, Interval.MinorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MajorSecond]);
    static readonly Symmetric = new Scale("symmetric", [Interval.MinorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond, Interval.MinorSecond, Interval.MajorSecond]);
    static readonly Scales = [
        Scale.Major, Scale.NaturalMinor, Scale.Ionian, Scale.Dorian, Scale.Phrygian,
        Scale.Lydian, Scale.Myxolydian, Scale.Aeolian, Scale.Locrian, Scale.PhrygianDominant,
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
    for (let interval of scale.intervals) {
        var nextNote = selectNextNote(thisNote, interval)
        notes.push(nextNote)
        thisNote = nextNote
    }

    return notes;
}

function selectIntervalBySteps(steps: number): Interval | null {
    for (let interval of Interval.Intervals) {
        if (interval.steps === steps) {
            return interval;
        }
    }
    return null;
}

export function buildScaleTriads(root: Note, scale: Scale): Chord[] {
    const scaleNotes = buildScale(root, scale);
    const chords: Chord[] = [];

    for (let i = 0; i < scaleNotes.length - 1; i++) {
        var nextScaleIntervals = [
            scale.intervals[i % scale.intervals.length], 
            scale.intervals[(i + 1) % scale.intervals.length], 
            scale.intervals[(i + 2) % scale.intervals.length], 
            scale.intervals[(i + 3) % scale.intervals.length]
        ];
        // console.log("nextScaleIntervals:", nextScaleIntervals.map(interval => interval.name));
        var firstSteps = (nextScaleIntervals[0].steps + nextScaleIntervals[1].steps);
        var secondSteps = (nextScaleIntervals[2].steps + nextScaleIntervals[3].steps);
        // console.log("firstSteps:", firstSteps, "secondSteps:", secondSteps);

        var firstInterval = selectIntervalBySteps(firstSteps % scale.intervals.length);
        var secondInterval = selectIntervalBySteps(secondSteps % scale.intervals.length);
        // console.log("firstInterval:", firstInterval?.name, "secondInterval:", secondInterval?.name);

        var secondNote = selectNextNote(scaleNotes[i], firstInterval!);
        var thirdNote = selectNextNote(secondNote, secondInterval!);
        // console.log("triad notes:", scaleNotes[i].name, secondNote.name, thirdNote.name);
        var chord = classifyChord([firstInterval!, secondInterval!]);
        chord.notes = [scaleNotes[i], secondNote, thirdNote];
        chords.push(chord);
    }

    return chords;
}

export function classifyChord(intervals: Interval[]): Chord {
    if (intervals.length === 1) {
        return new Chord(intervals[0].name, intervals);
    }

    for (const chord of Chord.Chords) {
        if (chord.intervals[0] === intervals[0] && chord.intervals[1] === intervals[1]) {
            return new Chord(chord.classification, chord.intervals);
        }
    }

    return new Chord("unclassified chord", intervals);
}

