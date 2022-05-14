import axios from 'axios'

export const state = () => ({
  works: {},
});

export const actions = {
  async getWorks() {
    await axios.get('http://localhost/sanctum/csrf-cookie').then(async (res) => {
      await axios.get('http://localhost/api/works').then(response => {
        commit('setWorks', response.data[0]);
        console.log(state.works);
      }).catch((err) => {
        console.log('error');
        console.log(err);
      });
    });
  }
};
