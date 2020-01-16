import 'react-native';
import 'isomorphic-fetch';
import Remote from '../src/Config/remote';

describe('Api test', () => {

  it('Success login Api test', async function () {

    let params = {
      username: "raghav@bosframework.com",
      password: 'Raghu@123',
    };

    let data = await fetch('https://apis.dev.bosframework.com/auth/odata/Verification?api-version=1.0', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: Remote.APP_KEY
      },
      body: JSON.stringify(params),
    }).then(response => {
      return response.json();
    }).then((responseJson) => {
      return responseJson;
    }).catch(error => {
      return error;
    });
    expect(data.userId).toEqual('7d0fe0c6-7558-4489-a91c-376e21c4266a');
  });


  it('Get user details', async function () {

    let email = "raghav@bosframework.com";

    let data = await fetch(`https://apis.dev.bosframework.com//auth/odata/users?$filter=email eq ${"'"}${email}${"'"}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: Remote.APP_KEY
      }
    }).then(response => {
      return response.json();
    }).then((responseJson) => {
      return responseJson;
    }).catch(error => {
      return error;
    });

    expect(data.value[0].id).toEqual('7d0fe0c6-7558-4489-a91c-376e21c4266a');
    expect(data.value[0].firstname).toEqual('Raghavender');

  });

});