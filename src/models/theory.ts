export const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];

export class Note {
    name: string;
    sharpName?: string;
    flatName?: string;
    alternateSharpName?: string;
    alternateFlatName?: string;
    index: number;
    octaveIndex: number;
    useFlatName: boolean = false;
    useSharpName: boolean = false;
    useAlternateSharpName: boolean = false;
    useAlternateFlatName: boolean = false;

    static readonly C = new Note("C", 0, 3, null, null, "B♯");
    static readonly CSHARP = new Note("C#", 1, 3, "C♯", "D♭");
    static readonly D = new Note("D", 2);
    static readonly DSHARP = new Note("D#", 3, 3, "D♯", "E♭");
    static readonly E = new Note("E", 4, 3, null, null, null, "F♭");
    static readonly F = new Note("F", 5, 3, null, null, "E♯");
    static readonly FSHARP = new Note("F#", 6, 3, "F♯", "G♭");
    static readonly G = new Note("G", 7);
    static readonly GSHARP = new Note("G#", 8, 3, "G♯", "A♭");
    static readonly A = new Note("A", 9);
    static readonly ASHARP = new Note("A#", 10, 3, "A♯", "B♭");
    static readonly B = new Note("B", 11, 3, null, null, null, "C♭");
    static readonly NullNote = new Note("", -1);
    static readonly Notes = [
        Note.C, Note.CSHARP, Note.D, Note.DSHARP,
        Note.E, Note.F, Note.FSHARP, Note.G,
        Note.GSHARP, Note.A, Note.ASHARP, Note.B
    ];

    constructor(name: string, index: number, octaveIndex: number = 3, sharpName?: string, flatName?: string, alternateSharpName?: string, alternateFlatName?: string) {
        this.name = name;
        this.index = index;
        this.octaveIndex = octaveIndex;
        this.sharpName = sharpName;
        this.flatName = flatName;
        this.alternateSharpName = alternateSharpName;
        this.alternateFlatName = alternateFlatName;
    }

    get scaleName(): string {
        return this.useAlternateFlatName && this.alternateFlatName ? this.alternateFlatName :
            this.useAlternateSharpName && this.alternateSharpName ? this.alternateSharpName :
            this.useFlatName && this.flatName ? this.flatName : 
            this.useSharpName && this.sharpName ? this.sharpName : 
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
    static readonly FlatThird = new ChordModification(Interval.MinorSecond, "flat third", "♭3", "2:subtract-interval");
    static readonly NoThird = new ChordModification(Interval.MajorThird, "no third", "no3", "2:remove-note");
    static readonly SharpThird = new ChordModification(Interval.MinorSecond, "sharp third", "♯3", "2:add-interval");
    static readonly SusSecond = new ChordModification(Interval.MajorSecond, "suspended second", "sus2", "2:replace-note");
    static readonly SusFourth = new ChordModification(Interval.PerfectFourth, "suspended fourth", "sus4", "2:replace-note");
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
        ChordModification.AddedSecond, ChordModification.FlatThird, ChordModification.NoThird, ChordModification.SharpThird, 
        ChordModification.SusSecond, ChordModification.SusFourth, ChordModification.FlatFifth, 
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
    static readonly MajorSeventhChord = new ChordShape("major seventh", [Interval.MajorThird, Interval.MinorThird, Interval.MajorThird], "Δ7");
    static readonly MinorSeventhChord = new ChordShape("minor seventh", [Interval.MinorThird, Interval.MajorThird, Interval.MinorThird], "-7");
    static readonly DominantSeventhChord = new ChordShape("dominant seventh", [Interval.MajorThird, Interval.MinorThird, Interval.MinorThird], "7");
    static readonly HalfDiminishedSeventhChord = new ChordShape("half-diminished seventh", [Interval.MinorThird, Interval.MinorThird, Interval.MajorThird], "ø7");
    static readonly DiminishedSeventhChord = new ChordShape("diminished seventh", [Interval.MinorThird, Interval.MinorThird, Interval.MinorThird], "°7");
    static readonly ChordShapes = [
        ChordShape.MajorTriad, ChordShape.MinorTriad, ChordShape.DiminishedTriad, ChordShape.AugmentedTriad,
        ChordShape.MajorSeventhChord, ChordShape.MinorSeventhChord, ChordShape.DominantSeventhChord, 
        ChordShape.HalfDiminishedSeventhChord, ChordShape.DiminishedSeventhChord
    ];
}

export class RelatedChords {
    secondaryDominantChord: Chord;
    targetChordIndex: number;
    relatedIIChord?: Chord;
    deceptiveResolutionChord?: Chord;
    substituteDominantChord?: Chord;
    subVRelatedIIChord?: Chord;
    tritoneSubstituteChord?: Chord;

    constructor(secondaryDominantChord: Chord, targetChordIndex: number, relatedIIChord?: Chord, deceptiveResolutionChord?: Chord, substituteDominantChord?: Chord, subVRelatedIIChord?: Chord, tritoneSubstituteChord?: Chord) {
        this.secondaryDominantChord = secondaryDominantChord;
        this.targetChordIndex = targetChordIndex;
        this.relatedIIChord = relatedIIChord;
        this.deceptiveResolutionChord = deceptiveResolutionChord;
        this.substituteDominantChord = substituteDominantChord;
        this.subVRelatedIIChord = subVRelatedIIChord;
        this.tritoneSubstituteChord = tritoneSubstituteChord;
    }
}

export class Chord {
    rootNote?: Note;
    shape: ChordShape;
    intervals: Interval[];
    notes: Note[];
    modifications: ChordModification[] = [];
    bassNote?: Note;
    relatedChords?: RelatedChords;

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
            console.log("Adding inversion notation for bass note:", this.bassNote.scaleName);
            notations.push("/" + (this.bassNote ? (this.bassNote.scaleName) : ""));
        }
        // then chord shape notation
        notations.push(this.shape.notation);
        // then suspensions
        for (let mod of this.modifications.filter(m => m.name.includes("sus"))) {
            notations.push(mod.notation);
        }
        // then other modifications
        for (let mod of this.modifications.filter(m => !m.name.includes("inversion") && !m.name.includes("sus"))) {
            notations.push(mod.notation);
        }
        return notations.join("");
    }

    romanNumeral(scaleNotes: Note[]): string {
        let notations = [];
        const rootName = this.rootNote ? (this.rootNote.scaleName) : 
            this.notes.length > 0 ? (this.notes[0].scaleName) : 
            undefined;
        notations.push(getRomanNumeral(rootName, scaleNotes));
        // // inversion first
        // if (this.bassNote && (this.bassNote.name !== this.rootNote?.name)) {
        //     notations.push("/" + (this.bassNote ? (this.bassNote.scaleName) : ""));
        // }
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
    keyRoot?: Note;
    keyScale?: Scale;
    index?: number;

    constructor(beats: number, chord: Chord, keyRoot?: Note, keyScale?: Scale, index?: number) {
        this.beats = beats;
        this.chord = chord;
        this.keyRoot = keyRoot;
        this.keyScale = keyScale;
        this.index = index;
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

function selectPriorNote(note: Note, interval: Interval): Note {
    var octaveIndex = note.octaveIndex
    var newIndex = note.index - interval.steps
    if (newIndex < 0) {
        newIndex = (newIndex + Note.Notes.length) % Note.Notes.length;
        octaveIndex -= 1;
    }
    const proto = Note.Notes[newIndex];
    const newNote = cloneNote(proto);
    newNote.octaveIndex = octaveIndex;
    return newNote
}

export function populateChordNotes(root: Note, chord: Chord): Note[] {
    const notes: Note[] = [];
    // Preserve octave index from existing root note if it exists (e.g., after shifting)
    if (chord.notes && chord.notes[0] && chord.notes[0] !== Note.NullNote) {
        root.octaveIndex = chord.notes[0].octaveIndex;
    }
    notes.push(root);
    chord.rootNote = root;
    var thisNote = root;
    for (let i = 0; i < chord.intervals.length; i++) {
        var interval = chord.intervals[i];
        var nextNote = selectNextNote(thisNote, interval)
        console.log("Populating chord notes, current note:", thisNote.name, " next note:", nextNote.name, " interval:", interval.name);
        // Preserve octave index from existing chord notes if they exist (e.g., after shifting)
        if (chord.notes && chord.notes[i] && chord.notes[i] !== Note.NullNote) {
            nextNote.octaveIndex = chord.notes[i].octaveIndex;
        }
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
    for (let interval of scale.intervals) {
        var nextNote = selectNextNote(thisNote, interval)
        console.log("Building scale, current note:", thisNote.name, " next note:", nextNote.name, " interval:", interval.name);
        notes.push(nextNote)
        thisNote = nextNote
    }
    // determine signature.
    // we will use only sharps or flats but not both.
    // preference should be for the fewer number of accidentals.
    // there should be one of each letter name in the scale.
    // This determination needs to be done note by note, not once for the whole scale.
    // For notes like C and F, we should only use the accidental names like B♯ or E♭ if the key signature requires it to avoid duplicates.
    let useAlternates = false;
    let useSharps = false;
    let useFlats = false;

    let scaleNotesWithoutOctave = notes.slice(0, -1);
    let sharpNames = scaleNotesWithoutOctave.map(note => note.sharpName ? note.sharpName : note.name);
    let flatNames = scaleNotesWithoutOctave.map(note => note.flatName ? note.flatName : note.name);

    let sharpDuplicates = sharpNames.filter((name, index, arr) => arr.findIndex(otherName => otherName.charAt(0) === name.charAt(0)) !== index);
    let flatDuplicates = flatNames.filter((name, index, arr) => arr.findIndex(otherName => otherName.charAt(0) === name.charAt(0)) !== index);
    console.log("Scale note names with sharps:", new Set(sharpNames), " duplicates:", sharpDuplicates);
    console.log("Scale note names with flats:", new Set(flatNames), " duplicates:", flatDuplicates);
    // if both have duplicates, try using the alternate names
    if (sharpDuplicates.length > 0 && flatDuplicates.length > 0) {
        useAlternates = true;
        sharpNames = scaleNotesWithoutOctave.map(note => note.alternateSharpName ? note.alternateSharpName : note.sharpName ? note.sharpName : note.name);
        flatNames = scaleNotesWithoutOctave.map(note => note.alternateFlatName ? note.alternateFlatName : note.flatName ? note.flatName : note.name);
        console.log("Scale note names with alternates (sharps):", new Set(sharpNames), "(flats):", new Set(flatNames));
        sharpDuplicates = sharpNames.filter((name, index, arr) => arr.findIndex(otherName => otherName.charAt(0) === name.charAt(0)) !== index);
        flatDuplicates = flatNames.filter((name, index, arr) => arr.findIndex(otherName => otherName.charAt(0) === name.charAt(0)) !== index);
        console.log("Scale note names with sharps (alternates):", new Set(sharpNames), " duplicates:", sharpDuplicates);
        console.log("Scale note names with flats (alternates):", new Set(flatNames), " duplicates:", flatDuplicates);
    }

    if (sharpDuplicates.length === 0) {
        console.log("Using sharps for scale note names");
        useSharps = true;
    } else if (flatDuplicates.length === 0) {
        console.log("Using flats for scale note names");
        useFlats = true;
    }
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        note.useFlatName = useFlats;
        note.useSharpName = useSharps;
        note.useAlternateFlatName = useAlternates && useFlats;
        note.useAlternateSharpName = useAlternates && useSharps;
    }

    console.log("Final scale notes in buildScale():", notes.map(note => note.scaleName));
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
        for (let note of [scaleNotes[i], secondNote, thirdNote]) {
            chord.notes.push(note);
        }
        chords.push(chord);
    }

    return chords;
}

export function buildScaleSevenths(root: Note, scale: Scale, scaleNotes: Note[]): Chord[] {
    const chords: Chord[] = [];

    console.log("Building scale sevenths for root:", root.name, " scale:", scale.name, " scaleNotes:", scaleNotes.map(note => note.name));
    console.log("Scale intervals:", scale.intervals.map(interval => interval.name));
    for (let i = 0; i < scaleNotes.length - 1; i++) {
        var nextScaleIntervals = [
            scale.intervals[i % scale.intervals.length], 
            scale.intervals[(i + 1) % scale.intervals.length], 
            scale.intervals[(i + 2) % scale.intervals.length], 
            scale.intervals[(i + 3) % scale.intervals.length],
            scale.intervals[(i + 4) % scale.intervals.length],
            scale.intervals[(i + 5) % scale.intervals.length]
        ];
        console.log("nextScaleIntervals:", nextScaleIntervals.map(interval => interval.name));
        var firstSteps = (nextScaleIntervals[0].steps + nextScaleIntervals[1].steps);
        var secondSteps = (nextScaleIntervals[2].steps + nextScaleIntervals[3].steps);
        var thirdSteps = (nextScaleIntervals[4].steps + nextScaleIntervals[5].steps);
        console.log("firstSteps:", firstSteps, "secondSteps:", secondSteps, "thirdSteps:", thirdSteps);

        var firstInterval = selectIntervalBySteps(firstSteps % scale.intervals.length);
        var secondInterval = selectIntervalBySteps(secondSteps % scale.intervals.length);
        var thirdInterval = selectIntervalBySteps(thirdSteps % scale.intervals.length);
        console.log("firstInterval:", firstInterval?.name, "secondInterval:", secondInterval?.name, "thirdInterval:", thirdInterval?.name);

        var secondNote = selectNextNote(scaleNotes[i], firstInterval!);
        var thirdNote = selectNextNote(secondNote, secondInterval!);
        var fourthNote = selectNextNote(thirdNote, thirdInterval!);
        console.log("seventh chord notes:", scaleNotes[i].name, secondNote.name, thirdNote.name, fourthNote.name);
        var shape = classifyChord([firstInterval!, secondInterval!, thirdInterval!]);
        var chord = new Chord(scaleNotes[i], shape);
        console.log("Classified chord shape:", shape.name, " for chord:", chord);
        for (let note of [scaleNotes[i], secondNote, thirdNote, fourthNote]) {
            chord.notes.push(note);
        }
        console.log("Built chord:", chord.notation);

        if (i >= 1 && i <= 5) {
            console.log("Adding related chords for chord:", chord.notation);
            chord.relatedChords = getRelatedChordsForChord(chord, i);
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
            (intervals.length < 3 || (shape.intervals.length >= 3 && shape.intervals[2] === intervals[2]))) {
            return new ChordShape(shape.name, shape.intervals, shape.notation);
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
    return new Note(note.name, note.index, note.octaveIndex, note.sharpName, note.flatName, note.alternateSharpName, note.alternateFlatName);
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
        newChord = removeConflictingMods(newChord, modification);
        newChord.modifications.push(modification);
    }
    return newChord;
}

export function removeConflictingMods(newChord: Chord, newMod: ChordModification): Chord {
    console.log('Removing conflicting modifications for:', JSON.parse(JSON.stringify(newMod)));
    const conflictingMods = [['♭3', '♯3', 'no3', 'sus2', 'sus4'], ['♭5', '♯5', 'no5'], ['♭9', 'add9'], ['♭11', 'add11'], ['I/III', 'I/V', 'I/VII']];
    conflictingMods.forEach(group => {
        if (group.includes(newMod.notation)) {
            console.log('Conflicting group found:', JSON.parse(JSON.stringify(group)), "for mod:", JSON.stringify(newMod));
            newChord.modifications = newChord.modifications.filter(mod => !group.includes(mod.notation));
        }
    });
    console.log('Current chord modifications after removing conflicts:', JSON.parse(JSON.stringify(newChord.modifications)));
    return newChord;
}

export function applyChordModification(chord: Chord, modification: ChordModification): Chord {
    const changes = modification.change.split(",");
    for (let change of changes) {
        chord = applySingleChange(chord, change, modification.interval);
    }
    return chord;
}

export function applySingleChange(chord: Chord, change: string, interval: Interval): Chord {
    // console.log("Applying modification:", modification.name, " to chord:", chord);
    const changeParts = change.split(":");
    const action = changeParts[1];
    let target = parseInt(changeParts[0]);
    // console.log("Applying modification action:", action, "on target index:", target, " note:", chord.notes[target - 1]);

    switch (action) {
        case "add-interval":
            chord.notes[target - 1] = selectNextNote(chord.notes[target - 1], interval);
            break;
        case "subtract-interval":
            let negativeInterval = new Interval("negative " + interval.name, interval.steps * -1);
            chord.notes[target - 1] = selectNextNote(chord.notes[target - 1], negativeInterval);
            break;
        case "remove-note":
            if (chord.notes && target - 1 < chord.notes.length) {
                chord.notes[target - 1] = Note.NullNote;
            }
            break;
        case "new-note":
            if (chord.notes) {
                const newNote = selectNextNote(chord.rootNote, interval);
                chord.notes.push(newNote);
            }
            break;
        case "replace-note":
            if (chord.notes && target - 1 < chord.notes.length) {
                const newNote = selectNextNote(chord.rootNote, interval);
                chord.notes[target - 1] = newNote;
            }
            break;
        case "new-note-plus-octave":
            if (chord.notes) {
                let newNote = selectNextNote(chord.rootNote, interval);
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
                // if notes have been removed, account for this
                for (let i = 0; i < target - 1; i++) {
                    if (chord.notes[i] === Note.NullNote) {
                        target = target + 1;
                    }
                }
                const notesToInvert = chord.notes.slice(0, target);
                console.log("Notes to invert:", notesToInvert);
                for (let i = 0; i < notesToInvert.length; i++) {
                    chord.notes.shift();
                    const invertedNote = cloneNote(notesToInvert[i]);
                    invertedNote.octaveIndex += 1;
                    chord.notes.push(invertedNote);
                }
                let bassNote = 0
                while (chord.notes[bassNote] === Note.NullNote) {
                    bassNote++;
                }
                chord.bassNote = chord.notes[bassNote];
            }
            break;
        default:
            break;
    }

    return chord;
}

export function shiftChord(chord: Chord, numberOfOctaves: number): Chord {
    let shiftedChord = cloneChord(chord);
    for (let i = 0; i < shiftedChord.notes.length; i++) {
        if (shiftedChord.notes[i] !== Note.NullNote) {
            const noteToShift = shiftedChord.notes[i];
            const modifiedNote = cloneNote(noteToShift);
            modifiedNote.octaveIndex += numberOfOctaves;
            shiftedChord.notes[i] = modifiedNote;
        }
    }
    if (shiftedChord.bassNote) {
        const modifiedBassNote = cloneNote(shiftedChord.bassNote);
        modifiedBassNote.octaveIndex += numberOfOctaves;
        shiftedChord.bassNote = modifiedBassNote;
    }
    return shiftedChord;
}

export function getRomanNumeral(rootName: string | undefined, scaleNotes: Note[]): string {
    if (!rootName) {
        return "";
    }
    const rootIndex = scaleNotes.findIndex(note => note.name === rootName || note.sharpName === rootName || note.flatName === rootName);
    if (rootIndex === -1) {
        return getRomanNumeralChromatic(rootName, scaleNotes);
    }
    return romanNumerals[rootIndex % romanNumerals.length];
}

export function getRomanNumeralChromatic(rootName: string, scaleNotes: Note[]): string {
    // cycle through chromatic notes to find the root note and determine its position relative to the scale notes
    const rootIndex = Note.Notes.findIndex(note => note.name === rootName || note.sharpName === rootName || note.flatName === rootName);
    if (rootIndex === -1) {
        return "";
    }
    const scaleNoteIndices = scaleNotes.map(scaleNote => Note.Notes.findIndex(note => note.name === scaleNote.name || note.sharpName === scaleNote.name || note.flatName === scaleNote.name));
    let closestScaleNoteIndex = -1;
    let minDistance = Number.MAX_VALUE;
    for (let i = 0; i < scaleNoteIndices.length; i++) {
        const distance = scaleNoteIndices[i] - rootIndex;
        if (distance > 0 && distance < minDistance) {
            minDistance = distance;
            closestScaleNoteIndex = i;
        }
    }
    const closestScaleNote = scaleNotes[closestScaleNoteIndex];
    const accidental = rootIndex < Note.Notes.findIndex(note => note.name === closestScaleNote.name || note.sharpName === closestScaleNote.name || note.flatName === closestScaleNote.name) ? "♭" : "♯";
    return accidental + romanNumerals[closestScaleNoteIndex % romanNumerals.length];
}

export function analyzeChordDiatonicity(chord: Chord, keyNotes: Note[]): string {
    if (!chord.rootNote) {
        return "unknown";
    }
    const rootIndex = keyNotes.findIndex(note => note.name === chord.rootNote!.name || note.sharpName === chord.rootNote!.name || note.flatName === chord.rootNote!.name);
    if (rootIndex === -1) {
        return "chromatic";
    } else {
        return "diatonic";
    }
}

export function analyzeChordFunction(chord: Chord, keyNotes: Note[]): string {
    const romanNumeral = getRomanNumeral(chord.rootNote.name, keyNotes);
    if (romanNumeral === "") {
        return "chromatic";
    }
    if (romanNumeral === "I" || romanNumeral === "III" || romanNumeral === "VI") {
        return "tonic";
    } else if (romanNumeral === "II" || romanNumeral === "IV") {
        return "subdominant";
    } else if (romanNumeral === "V" || romanNumeral === "VII") {
        return "dominant";
    } else {
        return "chromatic";
    }
}

export function analyzeChordFunctionByRoman(chord: Chord, keyNotes: Note[]): string {
    const romanNumeral = getRomanNumeral(chord.rootNote.name, keyNotes);
    if (romanNumeral === "") {
        return "chromatic";
    }
    if (romanNumeral === "I" || romanNumeral === "III" || romanNumeral === "VI") {
        return "tonic";
    } else if (romanNumeral === "II" || romanNumeral === "IV") {
        return "subdominant";
    } else if (romanNumeral === "V" || romanNumeral === "VII") {
        return "dominant";
    } else {
        return "chromatic";
    }
}

export function getRelatedChordsForChord(chord: Chord, targetIndex: number): RelatedChords {
        const targetNote = chord.rootNote
        const dominantChord = new Chord(selectNextNote(targetNote, Interval.PerfectFifth), ChordShape.DominantSeventhChord);
        dominantChord.notes = populateChordNotes(dominantChord.rootNote, dominantChord);
        const relatedIIChord = new Chord(selectNextNote(targetNote, Interval.MajorSecond), ChordShape.MinorSeventhChord);
        relatedIIChord.notes = populateChordNotes(relatedIIChord.rootNote, relatedIIChord);
        const deceptiveResolutionChord = new Chord(selectNextNote(targetNote, Interval.MajorSixth), ChordShape.MajorSeventhChord);
        deceptiveResolutionChord.notes = populateChordNotes(deceptiveResolutionChord.rootNote, deceptiveResolutionChord);
        const substituteDominantChord = new Chord(selectPriorNote(targetNote, Interval.MinorSecond), ChordShape.DominantSeventhChord);
        substituteDominantChord.notes = populateChordNotes(substituteDominantChord.rootNote, substituteDominantChord);
        const subVRelatedIIChord = new Chord(selectPriorNote(substituteDominantChord.rootNote, Interval.MinorSecond), ChordShape.MinorSeventhChord);
        subVRelatedIIChord.notes = populateChordNotes(subVRelatedIIChord.rootNote, subVRelatedIIChord);
        let tritoneSubstituteChord: Chord = null;
        if (chord.shape.name === "dominant seventh") {
            tritoneSubstituteChord = new Chord(selectPriorNote(targetNote, Interval.DiminishedFifth), ChordShape.DominantSeventhChord);
            tritoneSubstituteChord.notes = populateChordNotes(tritoneSubstituteChord.rootNote, tritoneSubstituteChord);
        }
        return new RelatedChords(dominantChord, targetIndex, relatedIIChord, deceptiveResolutionChord, substituteDominantChord, subVRelatedIIChord, tritoneSubstituteChord);
}

export function determineSecondaryDominantsForScale(scaleNotes: Note[]): RelatedChords[] {
    const relatedChords: RelatedChords[] = [];

    // we will skip tonic and seventh as these are not typically targets of secondary dominants
    for (let i = 0; i < scaleNotes.length - 3; i++) {
        const targetNote = scaleNotes[(i + 1) % scaleNotes.length];
        const dominantChord = new Chord(selectNextNote(targetNote, Interval.PerfectFifth), ChordShape.DominantSeventhChord);
        const relatedIIChord = new Chord(selectNextNote(targetNote, Interval.MajorSecond), ChordShape.MinorSeventhChord);
        const deceptiveResolutionChord = new Chord(selectNextNote(targetNote, Interval.MajorSixth), ChordShape.MajorSeventhChord);
        const substituteDominantChord = new Chord(selectPriorNote(targetNote, Interval.MinorSecond), ChordShape.DominantSeventhChord);
        const subVRelatedIIChord = new Chord(selectPriorNote(substituteDominantChord.rootNote, Interval.MinorSecond), ChordShape.MinorSeventhChord);
        // dominantChord.notes = populateChordNotes(dominantChord.rootNote, dominantChord);
        relatedChords.push(new RelatedChords(dominantChord, i, relatedIIChord, deceptiveResolutionChord, substituteDominantChord, subVRelatedIIChord));
    }

    return relatedChords;
}

export function fillBasedOnChordFunction(chord: Chord, keyRoot: Note, keyScale: Scale): string {
    console.log("Determining fill color for chord:", chord.notation, " in key of:", keyRoot.name, " ", keyScale.name);
    const keyNotes = buildScale(keyRoot, keyScale);
    const functionType = analyzeChordFunctionByRoman(chord, keyNotes);
    console.log("Filling based on chord function:", chord.rootNote.name, " function type:", functionType);
    const chromaticallyAltered = chord.notes.some(note => !keyNotes.some(keyNote => keyNote.name === note.name || keyNote.sharpName === note.name || keyNote.flatName === note.name));
    if (functionType === "tonic") {
        return chromaticallyAltered ? "mediumSeaGreen" : "palegreen";
    } else if (functionType === "subdominant") {
        return chromaticallyAltered ? "khaki" : "lightyellow";
    } else if (functionType === "dominant") {
        return chromaticallyAltered ? "indianred" : "lightcoral";
    } else if (functionType === "chromatic") {
        return "plum";
    } else {
        return "gray";
    }
}

// export function analyzeChordTension(chord: Chord, keyNotes: Note[]): string {
//     const functionType = analyzeChordFunction(chord, keyNotes);
//     if (functionType === "chromatic") {
//         return "high tension";
//     } else if (functionType === "tonic") {
//         return "low tension";
//     } else if (functionType === "subdominant") {
//         return "medium tension";
//     } else if (functionType === "dominant") {
//         return "high tension";
//     } else {
//         return "unknown tension";
//     }
// }
