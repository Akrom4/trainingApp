export class Course {
    chapter;
    moves;
    comments;
    title;
    constructor(title = '') {
        this.title = title;
        this.chapter = [];
    }

    addChapter( chapter = [{ Title: '', Number: 0, Moves: [], Comments: [], FEN : '' }]){
        this.chapter.push(chapter);
    }
}