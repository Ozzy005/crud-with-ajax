let button_new_register = document.getElementById('button-new-register');
let button_list_users = document.getElementById('button-list-users');

button_new_register.addEventListener('click', () => {
    if(!document.getElementById('container-register'))
    {
        containerRegister();
    }
})

button_list_users.addEventListener('click', () => {
    if(!document.getElementById('container-listing'))
    {
        containerListing();
    }
})

function containerRegister()
{
    if(document.getElementById('container-listing'))
    {
        let listing = document.getElementById('container-listing');
        listing.remove();
    }

    let main = document.getElementById('container-main');

    let register = document.createElement('div');
    register.setAttribute('id','container-register');

    let form = document.createElement('form');

    let name = document.createElement('input');
    name.setAttribute('type','text');
    name.setAttribute('id','input-name');
    name.setAttribute('name','name');
    name.setAttribute('placeholder','Nome Completo');

    let label_birth = document.createElement('label');
    label_birth.setAttribute('for','birth');
    label_birth.setAttribute('id','label-birth');
    label_birth.innerText = 'Data de Nascimento';

    let birth = document.createElement('input');
    birth.setAttribute('type','date');
    birth.setAttribute('id','input-birth');
    birth.setAttribute('name','birth');

    let cpf = document.createElement('input');
    cpf.setAttribute('type','text');
    cpf.setAttribute('id','input-cpf');
    cpf.setAttribute('name','cpf');
    cpf.setAttribute('placeholder','CPF (apenas números)');

    let phone = document.createElement('input');
    phone.setAttribute('type','tel');
    phone.setAttribute('id','input-phone');
    phone.setAttribute('name','phone');
    phone.setAttribute('placeholder','Número de celular com DDD (apenas números)');

    let email = document.createElement('input');
    email.setAttribute('type','email');
    email.setAttribute('id','input-email');
    email.setAttribute('name','email');
    email.setAttribute('placeholder','Endereço de email');

    let address = document.createElement('input');
    address.setAttribute('type','text');
    address.setAttribute('id','input-address');
    address.setAttribute('name','address');
    address.setAttribute('placeholder','Endereço');

    let city = document.createElement('input');
    city.setAttribute('type','text');
    city.setAttribute('id','input-city');
    city.setAttribute('name','city');
    city.setAttribute('placeholder','Cidade');

    let country = document.createElement('input');
    country.setAttribute('type','text');
    country.setAttribute('id','input-country');
    country.setAttribute('name','country-');
    country.setAttribute('placeholder','Estado');

    let obs = document.createElement('textarea');
    obs.setAttribute('id','input-obs');
    obs.setAttribute('name','obs');
    obs.setAttribute('placeholder','Opcionalmente deixe uma observação aqui de no máximo 300 caracteres.');

    let button_save_user = document.createElement('button');
    button_save_user.setAttribute('id','button-save-user');
    button_save_user.innerText = 'Salvar';

    let message = document.createElement('div');
    message.setAttribute('id','message');
    message.setAttribute('visibility','hidden');

    form.appendChild(name);
    form.appendChild(label_birth);
    form.appendChild(birth);
    form.appendChild(cpf);
    form.appendChild(phone);
    form.appendChild(email);
    form.appendChild(address);
    form.appendChild(city);
    form.appendChild(country);
    form.appendChild(obs);

    register.appendChild(form);
    register.appendChild(button_save_user);
    register.appendChild(message);

    main.appendChild(register);

    cleanFields();

    button_save_user.addEventListener('click', () => {

        let name = document.getElementById('input-name');
        let birth = document.getElementById('input-birth');
        let cpf = document.getElementById('input-cpf');
        let phone = document.getElementById('input-phone');
        let email = document.getElementById('input-email');
        let address = document.getElementById('input-address');
        let city = document.getElementById('input-city');
        let country = document.getElementById('input-country');
        let obs = document.getElementById('input-obs');

        if(checkFields(name, birth, cpf, phone, email, address, city, country, obs))
        {
            let data = JSON.stringify({
                "name" : name.value,
                "birth" : birth.value,
                "cpf" : cpf.value,
                "phone" : phone.value,
                "email" : email.value,
                "address" : address.value,
                "city" : city.value,
                "country" : country.value,
                "obs" : obs.value
            });

            submitForm('php/register.php', data, 'POST', 'mountMessage');
        }
    });
}

function containerListing()
{
    if(document.getElementById('container-register'))
    {
        let register = document.getElementById('container-register');
        register.remove();
    }

    let main = document.getElementById('container-main');

    let listing = document.createElement('div');
    listing.setAttribute('id','container-listing');

    let table = document.createElement('table');
    table.setAttribute('id','table');

    let thead = document.createElement('thead');

    let tr = document.createElement('tr');

    let id = document.createElement('th');
    id.setAttribute('class','th th-id');
    id.innerText = 'ID';

    let name = document.createElement('th');
    name.setAttribute('class','th th-nome');
    name.innerText = 'Nome';

    let email = document.createElement('th');
    email.setAttribute('class','th th-email');
    email.innerText = 'Email';

    let actions = document.createElement('th');
    actions.setAttribute('class','th th-actions');
    actions.innerText = 'Ações';

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(email);
    tr.appendChild(actions);

    thead.appendChild(tr);

    table.appendChild(thead);

    listing.appendChild(table);

    main.appendChild(listing);

    submitForm('php/listing.php', false, 'POST', 'mountColums');
}

function cleanFields()
{
    let inputs = document.querySelectorAll('input');
    let obs = document.getElementById('input-obs');

    for(let i = 0 ; i < inputs.length ; i++)
    {
        inputs[i].addEventListener('focus', () =>
        {
            inputs[i].style.border = '2px solid rgb(128, 128, 128)';
        })
    }

    obs.addEventListener('focus', () =>
    {
        obs.style.border = '2px solid rgb(128, 128, 128)';
    });
}

function checkFields(name, birth, cpf, phone, email, address, city, country, obs)
{
    if(name.value.search(/^[A-Za-z àÀáÁâÂãÃäèÈéÉêÊëìÌíÍîÎïòÒóÓôÔõÕöùÙúÚûÛü]{3,}$/))
    {
        name.style.border = '2px solid rgb(255, 0, 0)';
    }
    else if(birth.textLength == 0)
    {
        birth.style.border = '2px solid rgb(255, 0, 0)';
    }
    else if(!checkCPF(cpf.value))
    {
        cpf.style.border = '2px solid rgb(255, 0, 0)';
    }
    else if(phone.value.search(/^[0-9]{10,11}$/))
    {
        phone.style.border = '2px solid rgb(255, 0, 0)';
    }
    else if(email.textLength == 0)
    {
        email.style.border = '2px solid rgb(255, 0, 0)';
    }
    else if(address.textLength == 0)
    {
        address.style.border = '2px solid rgb(255, 0, 0)';
    }
    else if(city.textLength == 0)
    {
        city.style.border = '2px solid rgb(255, 0, 0)';
    }
    else if(country.textLength == 0)
    {
        country.style.border = '2px solid rgb(255, 0, 0)';
    }
    else if(obs.value.length > 300)
    {
        obs.style.border = '2px solid rgb(255, 0, 0)';
    }
    else
    {
        return true;
    }
}

function checkCPF(cpf)
{
    var soma;
    var resto;
    soma = 0;

    if(cpf == "00000000000")
    {
        return false;
    }

    for (i = 1 ; i <= 9 ; i++)
    {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = soma % 11;

    if(resto == 10 || resto == 11 || resto < 2)
    {
        resto = 0;
    }
    else
    {
        resto = 11 - resto;
    }

    if(resto != parseInt(cpf.substring(9, 10)))
    {
        return false;
    }

    soma = 0;

    for(i = 1; i <= 10; i++)
    {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = soma % 11;

    if(resto == 10 || resto == 11 || resto < 2)
    {
        resto = 0;
    }
    else
    {
        resto = 11 - resto;
    }

    if(resto != parseInt(cpf.substring(10, 11)))
    {
        return false;
    }

    return true;
}

function submitForm(url, data, method, calling)
{
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () =>
    {
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            let data = xhr.responseText;

            if(!data)
            {
                data = true;
            }

            window[calling](data);
        }
        else if(xhr.readyState == 4 && xhr.status != 200)
        {
            window[calling](false);
        }
    }

    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');

    if(data)
    {
        xhr.send(data);
    }
    else
    {
        xhr.send();
    }
}

function mountColums(data)
{
    data = JSON.parse(data);

    let table = document.getElementById('table');

    let tbody = document.createElement('tbody');

    data.forEach(element => {
        let tr = document.createElement('tr');

        let td_id = document.createElement('td');
        td_id.setAttribute('class','td td-id');
        td_id.innerText = element.id;

        let td_name = document.createElement('td');
        td_name.setAttribute('class','td td-name');
        td_name.innerText = element.name;

        let td_email = document.createElement('td');
        td_email.setAttribute('class','td td-email');
        td_email.innerText = element.email;

        let td_actions = document.createElement('td');
        td_actions.setAttribute('class', 'td td-actions');

        let button_save_edit = document.createElement('button');
        button_save_edit.setAttribute('id','button-save-edit');
        button_save_edit.innerText = 'Editar';

        let button_delete_user = document.createElement('button');
        button_delete_user.setAttribute('id','button-delete-user');
        button_delete_user.innerText = 'Excluir';

        td_actions.appendChild(button_save_edit);
        td_actions.appendChild(button_delete_user);

        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_email);
        tr.appendChild(td_actions);

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
}

function mountMessage(data)
{
    let message = document.getElementById('message');
    message.style.marginTop = '10px';

    if(data)
    {
        message.style.color = 'rgb(26, 102, 0)';
        message.innerText = 'SUCESSO';
    }
    else
    {
        message.style.color = 'rgb(102, 0, 0)';
        message.innerText = 'FALHA';
    }
}