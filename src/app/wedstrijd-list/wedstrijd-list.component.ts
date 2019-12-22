import { Component, OnInit } from '@angular/core';

function getLastTenGames() {
  let tableBodyEl = document.querySelector('#firstUpcomingGames tbody')
  var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() { 
          if (this.readyState == 4) {
              console.log(this.responseText);
              let wedstrijden = JSON.parse(this.responseText);
              for (let index = 0; index < wedstrijden.length; index++) {
                tableBodyEl.append(createTableRow(index, wedstrijden[index]));
              }
              console.log(wedstrijden);
          }
      }
      xhr.open("GET", "http://localhost:8082/wedstrijden", true);
      xhr.send();
}

function createTableRow(index, wedstrijd) {
  let row = document.createElement('tr');
  row.innerHTML =     '<tr>' + 
                          '<th scope="row">' + index + '</th>' +
                          '<td>' + wedstrijd.thuisTeam.naamTeam + ' - ' + wedstrijd.uitTeam.naamTeam + '</td>' +
                          '<td>' + wedstrijd.competitie + '</td>' +
                          '<td>' + wedstrijd.beginTijd + '</td>' +
                      '</tr>';
  return row;
}

@Component({
  selector: 'app-wedstrijd-list',
  templateUrl: './wedstrijd-list.component.html',
  styleUrls: ['./wedstrijd-list.component.css']
})
export class WedstrijdListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    getLastTenGames();
  }

}