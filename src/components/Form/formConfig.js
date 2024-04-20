import HomicidioCulposo from '../Incompetencias/HomicidioCulposo';
import Fraude from '../Incompetencias/Fraude';
import Hurto from '../Incompetencias/Hurto';
import Robo from '../Incompetencias/Robo';
import Territorio from '../Incompetencias/Territorio';
import Falsificacion from '../Incompetencias/Falsificacion';
import Conexidad from '../Incompetencias/Conexidad';
import Turno from '../Incompetencias/Turno';
import Coactivas from '../Incompetencias/Coactivas';
import Contravencional from '../Spp/Contravencional';
import ExtincionC from '../Spp/ExtincionC';
import Penal from '../Spp/Penal';
import Prematura from '../Incompetencias/Prematura';
import ExtincionPenal from '../Spp/ExtincionPenal';

export const formComponentMap = {
    Incompetencias: {
        'homicidio culposo': HomicidioCulposo,
        'fraude': Fraude,
        'falsificacion': Falsificacion,
        'hurto': Hurto,
        'robo': Robo,
        'territorio': Territorio,
        'conexidad': Conexidad,
        'turno': Turno,
        'coactivas': Coactivas,
        'prematura': Prematura,
    },
    Spp: {
        'penal': Penal,
        'contravencional': Contravencional,
    },
    Extinciones: {
        'extincion penal': ExtincionPenal,
        'extincion contravencional': ExtincionC,
    },
};

export const resolutionTypes = {
    Incompetencias: [
        'coactivas',
        'falsificacion',
        'fraude',
        'territorio',
        'conexidad',
        'turno',
        'homicidio culposo',
        'robo',
        'hurto',
        'prematura',
    ],
    Spp: ['contravencional', 'penal'],
    Extinciones: ['extincion contravencional', 'extincion penal'],
};