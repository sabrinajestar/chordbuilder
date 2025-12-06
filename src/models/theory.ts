export class Note {
    name: string;
    sharpName?: string;
    flatName?: string;
    index: number;
    octaveIndex: number;
    useFlatNames: boolean = false;
    useSharpNames: boolean = false;

    static readonly C = new Note("C", 0, 3, "B♯", "C");
    static readonly CSHARP = new Note("C#", 1, 3, "C♯", "D♭");
    static readonly D = new Note("D", 2);
    static readonly DSHARP = new Note("D#", 3, 3, "D♯", "E♭");
    static readonly E = new Note("E", 4, 3, "E", "F♭");
    static readonly F = new Note("F", 5, 3, "E♯", "F");
    static readonly FSHARP = new Note("F#", 6, 3, "F♯", "G♭");
    static readonly G = new Note("G", 7);
    static readonly GSHARP = new Note("G#", 8, 3, "G♯", "A♭");
    static readonly A = new Note("A", 9);
    static readonly ASHARP = new Note("A#", 10, 3, "A♯", "B♭");
    static readonly B = new Note("B", 11, 3, "B", "C♭");
    static readonly NullNote = new Note("", -1);
    static readonly Notes = [
        Note.C, Note.CSHARP, Note.D, Note.DSHARP,
        Note.E, Note.F, Note.FSHARP, Note.G,
        Note.GSHARP, Note.A, Note.ASHARP, Note.B
    ];

    constructor(name: string, index: number, octaveIndex: number = 3, sharpName?: string, flatName?: string, useSharpNames: boolean = false, useFlatNames: boolean = false) {
        this.name = name;
        this.index = index;
        this.octaveIndex = octaveIndex;
        this.sharpName = sharpName;
        this.flatName = flatName;
    }

    get scaleName(): string {
        return this.useFlatNames && this.flatName ? this.flatName : 
            this.useSharpNames && this.sharpName ? this.sharpName : 
            this.name;
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

export class ChordModification {
    interval: Interval;
    name: string;
    notation: string;
    change: string;

    constructor(interval: Interval, name: string, notation: string, change: string) {
        this.interval = interval;
        this.name = name;
        this.notation = notation;
        this.change = change;
    }

    static readonly AddedSecond = new ChordModification(Interval.MajorSecond, "added second", "add2", "1:new-note");
    static readonly NoThird = new ChordModification(Interval.MajorThird, "no third", "no3", "2:remove-note");
    static readonly FlatFifth = new ChordModification(Interval.MinorSecond, "flat fifth", "♭5", "3:subtract-interval");
    static readonly SharpFifth = new ChordModification(Interval.MinorSecond, "sharp fifth", "♯5", "3:add-interval");
    static readonly NoFifth = new ChordModification(Interval.PerfectFifth, "no fifth", "no5", "3:remove-note");
    static readonly AddSixth = new ChordModification(Interval.MajorSixth, "added sixth", "add6", "1:new-note");
    static readonly AddedFlatNinth = new ChordModification(Interval.MinorSecond, "added flat ninth", "♭9", "1:new-note-plus-octave");
    static readonly AddedNinth = new ChordModification(Interval.MajorSecond, "added ninth", "add9", "1:new-note-plus-octave");
    static readonly AddedFlatEleventh = new ChordModification(Interval.MajorThird, "added flat eleventh", "♭11", "1:new-note-plus-octave");
    static readonly AddedEleventh = new ChordModification(Interval.PerfectFourth, "added eleventh", "add11", "1:new-note-plus-octave");
    static readonly FirstInversion = new ChordModification(Interval.PerfectOctave, "first inversion", "I/III", "1:invert");
    static readonly SecondInversion = new ChordModification(Interval.PerfectOctave, "second inversion", "I/V", "2:invert");
    static readonly ThirdInversion = new ChordModification(Interval.PerfectOctave, "third inversion", "I/VII", "3:invert");
    
    static readonly ChordMods = [
        ChordModification.AddedSecond, ChordModification.NoThird, ChordModification.FlatFifth, 
        ChordModification.NoFifth, ChordModification.SharpFifth, ChordModification.AddSixth, 
        ChordModification.AddedFlatNinth, ChordModification.AddedNinth, ChordModification.AddedFlatEleventh, 
        ChordModification.AddedEleventh, ChordModification.FirstInversion, ChordModification.SecondInversion, 
        ChordModification.ThirdInversion
    ];
}

export class ChordShape {
    name: string;
    notation: string = "";
    intervals: Interval[];

    constructor(name: string, intervals: Interval[], notation: string = "") {
        this.name = name;
        this.intervals = intervals;
        this.notation = notation;
    }

    static readonly MajorTriad = new ChordShape("major", [Interval.MajorThird, Interval.MinorThird]);
    static readonly MinorTriad = new ChordShape("minor", [Interval.MinorThird, Interval.MajorThird], "-");
    static readonly DiminishedTriad = new ChordShape("diminished", [Interval.MinorThird, Interval.MinorThird], "°");
    static readonly AugmentedTriad = new ChordShape("augmented", [Interval.MajorThird, Interval.MajorThird], "+");
    static readonly SuspendedFourth = new ChordShape("suspended fourth", [Interval.PerfectFourth, Interval.MajorSecond], "sus4");
    static readonly SuspendedSecond = new ChordShape("suspended second", [Interval.MajorSecond, Interval.PerfectFourth], "sus2");
    static readonly MajorSeventhChord = new ChordShape("major seventh", [Interval.MajorThird, Interval.MinorThird, Interval.MajorThird], "Δ7");
    static readonly MinorSeventhChord = new ChordShape("minor seventh", [Interval.MinorThird, Interval.MajorThird, Interval.MinorThird], "-7");
    static readonly DominantSeventhChord = new ChordShape("dominant seventh", [Interval.MajorThird, Interval.MinorThird, Interval.MinorThird], "7");
    static readonly DiminishedSeventhChord = new ChordShape("diminished seventh", [Interval.MinorThird, Interval.MinorThird, Interval.MinorThird], "°7");
    static readonly ChordShapes = [
        ChordShape.MajorTriad, ChordShape.MinorTriad, ChordShape.DiminishedTriad, ChordShape.AugmentedTriad,
        ChordShape.SuspendedFourth, ChordShape.SuspendedSecond, ChordShape.MajorSeventhChord,
        ChordShape.MinorSeventhChord, ChordShape.DominantSeventhChord, ChordShape.DiminishedSeventhChord
    ];
}

export class Chord {
    rootNote?: Note;
    shape: ChordShape;
    intervals: Interval[];
    notes: Note[];
    modifications: ChordModification[] = [];
    bassNote?: Note;

    constructor(rootNote: Note, shape: ChordShape, notes: Note[] = []) {
        this.rootNote = rootNote;
        this.shape = shape;
        this.intervals = shape.intervals;
        this.notes = notes;
    }

    get name(): string {
        // console.log("Getting chord name for:", this);
        const rootName = this.rootNote ? (this.rootNote.scaleName) : 
            this.notes.length > 0 ? (this.notes[0].scaleName) : 
            undefined;
        // console.log("Chord rootName:", rootName);
        const name = rootName !== undefined ? rootName + " " + this.shape.name : this.shape.name;
        return name;
    }

    get notation(): string {
        let notations = [];
        const rootName = this.rootNote ? (this.rootNote.scaleName) : 
            this.notes.length > 0 ? (this.notes[0].scaleName) : 
            undefined;
        notations.push(rootName);
        // inversion first
        if (this.bassNote && (this.bassNote.name !== this.rootNote?.name)) {
            notations.push("/" + (this.bassNote ? (this.bassNote.scaleName) : ""));
        }
        // then chord shape notation
        notations.push(this.shape.notation);
        // then other modifications
        for (let mod of this.modifications.filter(m => !m.name.includes("inversion"))) {
            notations.push(mod.notation);
        }
        return notations.join("");
    }
}

export class Step {
    beats: number;
    chord: Chord;

    constructor(beats: number, chord: Chord) {
        this.beats = beats;
        this.chord = chord;
    }
}

export class ChordProgression {
    steps: Step[];

    constructor() {
        this.steps = [];
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

class KeySignature {
    root: Note;
    scale: Scale;
    useSharpNames: boolean = false;
    useFlatNames: boolean = false;

    constructor(root: Note, scale: Scale, useSharpNames: boolean = false, useFlatNames: boolean = false) {
        this.root = root;
        this.scale = scale;
        this.useFlatNames = useFlatNames;
        this.useSharpNames = useSharpNames;
    }

    static readonly C_Major = new KeySignature(Note.C, Scale.Major, false, false);
    static readonly A_Minor = new KeySignature(Note.A, Scale.NaturalMinor, false, false);
    static readonly G_Major = new KeySignature(Note.G, Scale.Major, true, false);
    static readonly E_Minor = new KeySignature(Note.E, Scale.NaturalMinor, true, false);
    static readonly D_Major = new KeySignature(Note.D, Scale.Major, true, false);
    static readonly B_Minor = new KeySignature(Note.B, Scale.NaturalMinor, true, false);
    static readonly A_Major = new KeySignature(Note.A, Scale.Major, true, false);
    static readonly FSHARP_Minor = new KeySignature(Note.FSHARP, Scale.NaturalMinor, true, false);
    static readonly E_Major = new KeySignature(Note.E, Scale.Major, true, false);
    static readonly CSHARP_Minor = new KeySignature(Note.CSHARP, Scale.NaturalMinor, true, false);
    static readonly B_Major = new KeySignature(Note.B, Scale.Major, true, false);
    static readonly GSHARP_Minor = new KeySignature(Note.GSHARP, Scale.NaturalMinor, true, false);
    static readonly FSHARP_Major = new KeySignature(Note.FSHARP, Scale.Major, true, false);
    static readonly DSHARP_Minor = new KeySignature(Note.DSHARP, Scale.NaturalMinor, true, false);
    static readonly CSHARP_Major = new KeySignature(Note.CSHARP, Scale.Major, true, false);
    static readonly ASHARP_Minor = new KeySignature(Note.ASHARP, Scale.NaturalMinor, true, false);
    
    static readonly F_Major = new KeySignature(Note.F, Scale.Major, false, true);
    static readonly D_Minor = new KeySignature(Note.D, Scale.NaturalMinor, false, true);
    static readonly BFLAT_Major = new KeySignature(Note.ASHARP, Scale.Major, false, true);
    static readonly G_Minor = new KeySignature(Note.G, Scale.NaturalMinor, false, true);
    static readonly EFLAT_Major = new KeySignature(Note.DSHARP, Scale.Major, false, true);
    static readonly C_Minor = new KeySignature(Note.C, Scale.NaturalMinor, false, true);
    static readonly AFLAT_Major = new KeySignature(Note.GSHARP, Scale.Major, false, true);
    static readonly F_Minor = new KeySignature(Note.F, Scale.NaturalMinor, false, true);

    static readonly KeySignatures = [
        KeySignature.C_Major, KeySignature.A_Minor, KeySignature.G_Major, KeySignature.E_Minor,
        KeySignature.D_Major, KeySignature.B_Minor, KeySignature.A_Major, KeySignature.FSHARP_Minor,
        KeySignature.E_Major, KeySignature.CSHARP_Minor, KeySignature.B_Major, KeySignature.GSHARP_Minor,
        KeySignature.FSHARP_Major, KeySignature.DSHARP_Minor, KeySignature.CSHARP_Major, KeySignature.ASHARP_Minor,
        KeySignature.F_Major, KeySignature.D_Minor, KeySignature.BFLAT_Major, KeySignature.G_Minor,
        KeySignature.EFLAT_Major, KeySignature.C_Minor, KeySignature.AFLAT_Major, KeySignature.F_Minor
    ];
}

function selectNextNote(note: Note, interval: Interval): Note {
    var octaveIndex = note.octaveIndex
    var newIndex = note.index + interval.steps
    if (newIndex >= Note.Notes.length) {
        newIndex = newIndex % Note.Notes.length;
        octaveIndex += 1;
    }
    const proto = Note.Notes[newIndex];
    const newNote = cloneNote(proto);
    newNote.octaveIndex = octaveIndex;
    return newNote
}

export function popuplateChordNotes(root: Note, chord: Chord): Note[] {
    const notes: Note[] = [];
    notes.push(root);
    chord.rootNote = root;
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
    let dupeRoot =  cloneNote(root);
    notes.push(dupeRoot);
    var thisNote = dupeRoot;
    var useFlatNames = false;
    var useSharpNames = false;
    for (let signature of KeySignature.KeySignatures) {
        if (signature.root.name === root.name && signature.scale.name === scale.name) {
            console.log("Using key signature for scale building:", signature.root.name, signature.scale.name, " useFlatNames:", signature.useFlatNames, " useSharpNames:", signature.useSharpNames);
            useFlatNames = signature.useFlatNames;
            useSharpNames = signature.useSharpNames;
        }
    }
    for (let interval of scale.intervals) {
        var nextNote = selectNextNote(thisNote, interval)
        console.log("Building scale, current note:", thisNote.name, " next note:", nextNote.name, " interval:", interval.name);
        notes.push(nextNote)
        thisNote = nextNote
    }
    for (let note of notes) {
        note.useFlatNames = useFlatNames;
        note.useSharpNames = useSharpNames;
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
        var shape = classifyChord([firstInterval!, secondInterval!]);
        var chord = new Chord(scaleNotes[i], shape);
        for (let note of [secondNote, thirdNote]) {
            chord.notes.push(note);
        }
        chords.push(chord);
    }

    return chords;
}

export function classifyChord(intervals: Interval[]): ChordShape {
    if (intervals.length === 1) {
        return new ChordShape(intervals[0].name, intervals);
    }

    for (const shape of ChordShape.ChordShapes) {
        if (shape.intervals[0] === intervals[0] && 
            shape.intervals[1] === intervals[1] && 
            (intervals.length < 3 || shape.intervals.length < 3 || shape.intervals[2] === intervals[2])) {
            return new ChordShape(shape.name, shape.intervals);
        }
    }

    return new ChordShape("unclassified chord", intervals);
}

export function applyChordModifications(chord: Chord): Chord {
    let modifiedChord = chord;
    for (let modification of chord.modifications) {
        modifiedChord = applyChordModification(modifiedChord, modification);
    }
    return modifiedChord;
}

export function cloneNote(note: Note): Note {
    return new Note(note.name, note.index, note.octaveIndex, note.sharpName, note.flatName, note.useSharpNames, note.useFlatNames);
}

export function cloneChord(chord: Chord): Chord {
    let newChord = new Chord(chord.rootNote!, chord.shape, chord.notes.slice());
    newChord.modifications = chord.modifications.slice();
    newChord.bassNote = chord.bassNote;
    newChord.rootNote = chord.rootNote;
    return newChord;
}

export function toggleChordModification(chord: Chord, modification: ChordModification): Chord {
    let newChord = cloneChord(chord);
    const modIndex = newChord.modifications.findIndex(mod => mod.name === modification.name);
    if (modIndex >= 0) {
        newChord.modifications.splice(modIndex, 1);
    } else {
        newChord.modifications.push(modification);
    }
    return newChord;
}

export function applyChordModification(chord: Chord, modification: ChordModification): Chord {
    // console.log("Applying modification:", modification.name, " to chord:", chord);
    const changeParts = modification.change.split(":");
    const action = changeParts[1];
    const target = parseInt(changeParts[0]);
    // console.log("Applying modification action:", action, "on target index:", target, " note:", chord.notes[target - 1]);

    switch (action) {
        case "add-interval":
            chord.notes[target - 1] = selectNextNote(chord.notes[target - 1], modification.interval);
            break;
        case "subtract-interval":
            let negativeInterval = new Interval("negative " + modification.interval.name, modification.interval.steps * -1);
            chord.notes[target - 1] = selectNextNote(chord.notes[target - 1], negativeInterval);
            break;
        case "remove-note":
            if (chord.notes && target - 1 < chord.notes.length) {
                chord.notes[target - 1] = Note.NullNote;
            }
            break;
        case "new-note":
            if (chord.notes) {
                const newNote = selectNextNote(chord.rootNote, modification.interval);
                chord.notes.push(newNote);
            }
            break;
        case "new-note-plus-octave":
            if (chord.notes) {
                let newNote = selectNextNote(chord.rootNote, modification.interval);
                newNote = cloneNote(newNote);
                newNote.octaveIndex += 1;
                chord.notes.push(newNote);
            }
            break;
        case "add-octave":
            if (chord.notes && target - 1 < chord.notes.length) {
                const noteToModify = chord.notes[target - 1];
                const modifiedNote = cloneNote(noteToModify);
                modifiedNote.octaveIndex += 1;
                chord.notes[target - 1] = modifiedNote;
            }
            break;
        case "invert":
            if (chord.notes && target - 1 < chord.notes.length) {
                const notesToInvert = chord.notes.slice(0, target);
                console.log("Notes to invert:", notesToInvert);
                for (let i = 0; i < notesToInvert.length; i++) {
                    chord.notes.shift();
                    const invertedNote = cloneNote(notesToInvert[i]);
                    invertedNote.octaveIndex += 1;
                    chord.notes.push(invertedNote);
                }
                chord.bassNote = chord.notes[0];
            }
            break;
        default:
            break;
    }

    return chord;
}
