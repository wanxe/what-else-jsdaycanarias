export class DogsRepository {
  static API_URL = 'http://localhost:3000'

  static getDogs () {
    return fetch(`${this.API_URL}/breeds`);
  }

  static getDogPicturesByBreed (breed) {
    return fetch(`${this.API_URL}/pictures/${breed}`);
  }
}
