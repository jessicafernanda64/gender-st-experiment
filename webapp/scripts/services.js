var tutorServices = angular.module("tutor.services", []);

function _get(key) {
    return window.sessionStorage.getItem(key);
}

function _set(key, val) {
    return window.sessionStorage.setItem(key, val);
}

function _getJSON(key) {
    try {
        return JSON.parse(_get(key));
    } catch (e) {
        return null;
    }
}

function _setJSON(key, val) {
    return _set(key, JSON.stringify(val));
}

tutorServices.service("configService", function() {

    var opts = ["default", "stMale", "stFemale"];

    var random = Math.floor((Math.random() * 123457)) % 3;
    var currentTheme = _get("testType") || opts[random];
    // var currentTheme = "default";

    var next = false;

    var badgeFlags = [false, false, false];

    this.setTheme = function(value) {
        console.log("setting theme: " + value);
        _set("testType", value);
        currentTheme = value;
    };

    this.getTheme = function() {
        return currentTheme;
    };

    this.setNext = function(value) {
        next = value;
    };

    this.getNext = function() {
        return next;
    };

    this.addBadge = function(id) {
        badgeFlags[id] = true;
    };

    this.getBadges = function() {
        return badgeFlags;
    };

});

tutorServices.service("User", function($http, $location) {
    var resp = {
        startTime: Number(_get("startTime")) || 0,
        endTime: Number(_get("endTime")) || 0,
        gender: _get("gender") || "",
        age: _get("age") || "",
        testType: _get("testType") || "",
        pretestPoints: Number(_get("pretestPoints")) || 0,
        activityPoints: Number(_get("activityPoints")) || 0,
        posttestPoints: Number(_get("posttestPoints")) || 0,
        pre: _getJSON("pre") || [],
        post: _getJSON("post") || [],

        name: _get("name"),
        city: _get("city"),
        email: _get("email"),
        whatsapp: _get("whatsapp"),
        ethnicity: _get("ethnicity"),
        civilState: _get("civilState"),
        economicState: _get("economicState"),
        institucion: _get("institucion"),
        educationLevel: _get("educationLevel"),
        grade: _get("grade")
    };

    // Volta pro pré-teste se a sessão for inválida: Estiver na frente do pré-teste e não tiver testType
    /*
    if ($location.path() != "/pretest" && !resp.testType) {
        window.sessionStorage.clear();
        $location.path("/pretest");
    }
    */

    console.log("RESP" + "-".repeat(30));
    console.table(resp);
    console.log("RESP" + "-".repeat(30));

    this.setAge = function(value) { resp.age = value; _set("age", value); }
    this.setName = function(value) { resp.name = value; _set("name", value); }
    this.setEmail = function(value) { resp.email = value; _set("email", value); }
    this.setEthnicity = function(value) { resp.ethnicity = value; _set("ethnicity", value); }
    this.setCivilState = function(value) { resp.civilState = value; _set("civilState", value); }
    this.setCity = function(value) { resp.city = value; _set("city", value); }
    this.setWhatsapp = function(value) { resp.whatsapp = value; _set("whatsapp", value); }
    this.setEconomicState = function(value) { resp.economicState = value; _set("economicState", value); }
    this.setInstitucion = function(value) { resp.institucion = value; _set("institucion", value); }
    this.setEducationLevel = function(value) { resp.educationLevel = value; _set("educationLevel", value); }
    this.setGrade = function(value) { resp.grade = value; _set("grade", value); }

    this.setGender = function(value) {
        // O usuário responde o gênero no inicio e no final do teste por algum motivo???
        // A resposta dada no final sobrescreve a dada no inicio
        // E ambas podem ser deixadas em branco
        if (!!value) {
            _set("gender", value);
            resp.gender = value;
        }
    }

    this.setTestType = function(value) {
        _set("testType", value);
        resp.testType = value;
    };

    this.setPretestPoints = function(value) {
        _set("pretestPoints", value);
        resp.pretestPoints = value;
    };

    this.setPosttestPoints = function(value) {
        _set("posttestPoints", value);
        resp.posttestPoints = value;
    };

    this.setActivityPoints = function(value) {
        _set("activityPoints", value);
        resp.activityPoints = value;
    };

    this.getResponse = function() {
        return resp;
    };

    this.getAnxiety = function() {
        return resp.pretestPoints;
    };

    this.setPre = function(value) {
        _setJSON("pre", value);
        resp.pre = value;
    };

    this.setPost = function(value) {
        _setJSON("post", value);
        resp.post = value;
    };

    this.setStartTime = function(value) {
        _set("startTime", value);
        resp.startTime = value;
    };

    this.setEndTime = function(value) {
        _set("endTime", value);
        resp.endTime = value;
    };

    this.save = function() {
        $http({
            url: "https://weblab.nees.com.br/jfernanda/save-response",
            dataType: "json",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: resp
        }).then(function(response) {
            // success
            console.log("response sent!");

        }, function(response) {
            // failed
            console.error("Failed to submit participant response. " + response);
        });
    };

});
