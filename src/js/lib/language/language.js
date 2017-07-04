import JaroWinkler from './jaro-winkler';

const Language = {
  distance(a,b){
    return JaroWinkler.distance(a,b);
  }
};

export default Language;
