from flask import Flask, request, jsonify
import time
app = Flask(__name__)

@app.route("/api/python", methods=["POST"])
def get_route():
    data = request.json
    origen = data.get("paradaOrigen")
    destino = data.get("paradaDestino")
    
    respuesta = f"Este es el trayecto más corto desde {origen} hasta {destino}."
    
    time.sleep(5)
    return jsonify({"route": respuesta})

if __name__ == '__main__':
    app.run(debug=True)