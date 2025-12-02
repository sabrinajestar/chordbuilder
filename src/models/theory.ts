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
    static readonly NullNote = new Note("", -1);
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
    static readonly FlatThird = new ChordModification(Interval.MinorSecond, "flat third", "b3", "2:subtract-interval");
    static readonly NoThird = new ChordModification(Interval.MajorThird, "no third", "no3", "2:remove-note");
    static readonly SharpThird = new ChordModification(Interval.MinorSecond, "sharp third", "#3", "2:add-interval");
    static readonly FlatFifth = new ChordModification(Interval.MinorSecond, "flat fifth", "b5", "3:subtract-interval");
    static readonly SharpFifth = new ChordModification(Interval.MinorSecond, "sharp fifth", "#5", "3:add-interval");
    static readonly NoFifth = new ChordModification(Interval.PerfectFifth, "no fifth", "no5", "3:remove-note");
    static readonly AddSixth = new ChordModification(Interval.MajorSixth, "added sixth", "6", "1:new-note");
    static readonly AddedFlatNinth = new ChordModification(Interval.MinorSecond, "added flat ninth", "b9", "1:new-note-plus-octave");
    static readonly AddedNinth = new ChordModification(Interval.MajorSecond, "added ninth", "add9", "1:new-note-plus-octave");
    static readonly AddedFlatEleventh = new ChordModification(Interval.MajorThird, "added flat eleventh", "b11", "1:new-note-plus-octave");
    static readonly AddedEleventh = new ChordModification(Interval.PerfectFourth, "added eleventh", "add11", "1:new-note-plus-octave");
    static readonly FirstInversion = new ChordModification(Interval.PerfectOctave, "first inversion", "I/III", "1:invert");
    static readonly SecondInversion = new ChordModification(Interval.PerfectOctave, "second inversion", "I/V", "2:invert");
    static readonly ThirdInversion = new ChordModification(Interval.PerfectOctave, "third inversion", "I/VII", "3:invert");
    
    static readonly ChordMods = [
        ChordModification.AddedSecond, ChordModification.FlatThird, ChordModification.NoThird, ChordModification.SharpThird, 
        ChordModification.FlatFifth, ChordModification.NoFifth, ChordModification.SharpFifth, ChordModification.AddSixth, 
        ChordModification.AddedFlatNinth, ChordModification.AddedNinth, ChordModification.AddedFlatEleventh, 
        ChordModification.AddedEleventh, ChordModification.FirstInversion, ChordModification.SecondInversion, 
        ChordModification.ThirdInversion
    ];
}

export class Chord {
    classification: string;
    intervals: Interval[];
    notes: Note[];
    bassNote?: Note;
    rootNote?: Note;

    static readonly MajorTriad = new Chord("major", [Interval.MajorThird, Interval.MinorThird]);
    static readonly MinorTriad = new Chord("minor", [Interval.MinorThird, Interval.MajorThird]);
    static readonly DiminishedTriad = new Chord("diminished", [Interval.MinorThird, Interval.MinorThird]);
    static readonly AugmentedTriad = new Chord("augmented", [Interval.MajorThird, Interval.MajorThird]);
    static readonly SuspendedFourth = new Chord("suspended fourth", [Interval.PerfectFourth, Interval.MajorSecond]);
    static readonly SuspendedSecond = new Chord("suspended second", [Interval.MajorSecond, Interval.PerfectFourth]);
    static readonly MajorSeventhChord = new Chord("major seventh", [Interval.MajorThird, Interval.MinorThird, Interval.MajorThird]);
    static readonly MinorSeventhChord = new Chord("minor seventh", [Interval.MinorThird, Interval.MajorThird, Interval.MinorThird]);
    static readonly DominantSeventhChord = new Chord("dominant seventh", [Interval.MajorThird, Interval.MinorThird, Interval.MinorThird]);
    static readonly DiminishedSeventhChord = new Chord("diminished seventh", [Interval.MinorThird, Interval.MinorThird, Interval.MinorThird]);
    static readonly Chords = [
        Chord.MajorTriad,
        Chord.MinorTriad,
        Chord.DiminishedTriad,
        Chord.AugmentedTriad,
        Chord.SuspendedFourth,
        Chord.SuspendedSecond,
        Chord.MajorSeventhChord,
        Chord.MinorSeventhChord,
        Chord.DominantSeventhChord,
        Chord.DiminishedSeventhChord
    ];

    constructor(classification: string, intervals: Interval[], notes: Note[] = []) {
        this.classification = classification;
        this.intervals = intervals;
        this.notes = notes;
    }

    get name(): string {
        const name = (this.notes.length > 0) ? this.notes[0].name + " " + this.classification : this.classification;
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

export function applyChordModification(chord: Chord, modification: ChordModification): Chord {
    // let newChord = new Chord(chord.classification, chord.intervals, chord.notes);
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
            let negativeInterval = new Interval("negative " + modification.interval.name, 12 - modification.interval.steps);
            chord.notes[target - 1] = selectNextNote(chord.notes[target - 1], negativeInterval);
            break;
        case "remove-note":
            if (chord.notes && target - 1 < chord.notes.length) {
                chord.notes[target - 1] = Note.NullNote;
            }
            break;
        case "new-note":
            if (chord.notes) {
                const newNote = selectNextNote(chord.notes[0], modification.interval);
                chord.notes.push(newNote);
            }
            break;
        case "new-note-plus-octave":
            if (chord.notes) {
                let newNote = selectNextNote(chord.notes[0], modification.interval);
                newNote = new Note(newNote.name, newNote.index, newNote.octaveIndex + 1);
                chord.notes.push(newNote);
            }
            break;
        case "add-octave":
            if (chord.notes && target - 1 < chord.notes.length) {
                const noteToModify = chord.notes[target - 1];
                const modifiedNote = new Note(noteToModify.name, noteToModify.index, noteToModify.octaveIndex + 1);
                chord.notes[target - 1] = modifiedNote;
            }
            break;
        case "invert":
            if (chord.notes && target - 1 < chord.notes.length) {
                const notesToInvert = chord.notes.slice(0, target);
                console.log("Notes to invert:", notesToInvert);
                for (let i = 0; i < notesToInvert.length; i++) {
                    chord.notes.shift();
                    const invertedNote = new Note(notesToInvert[i].name, notesToInvert[i].index, notesToInvert[i].octaveIndex + 1);
                    chord.notes.push(invertedNote);
                }
                // const noteToInvert = notesToInvert.shift()!;
                // const invertedNote = new Note(noteToInvert.name, noteToInvert.index, noteToInvert.octaveIndex + 1);
                // notesToInvert.push(invertedNote);
                chord.bassNote = chord.notes[0];
                // chord.notes = notesToInvert.concat(chord.notes.slice(target));
            }
            break;
        default:
            break;
    }

    return chord;
}

